#!/usr/bin/env node

/**
 * Cloudinary Batch Upload Script
 * ==============================
 * Uploads all sequence frames to Cloudinary and saves a manifest JSON file.
 *
 * Usage:
 *   node scripts/upload-to-cloudinary.mjs
 *
 * Environment variables (from .env.local):
 *   CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET,
 *   CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_FOLDER
 *
 * Output:
 *   data/cloudinary-manifest.json — array of { index, publicId, width, height, format, url }
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, resolve, basename } from 'path';
import { createHash } from 'crypto';

// ---------------------------------------------------------------------------
// 1. Load .env.local manually (no dependencies needed)
// ---------------------------------------------------------------------------
const ROOT = resolve(import.meta.dirname, '..');
const ENV_PATH = join(ROOT, '.env.local');

function loadEnv(filePath) {
    if (!existsSync(filePath)) {
        throw new Error(`.env.local not found at ${filePath}`);
    }
    const lines = readFileSync(filePath, 'utf-8').split('\n');
    const env = {};
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex === -1) continue;
        const key = trimmed.slice(0, eqIndex).trim();
        const value = trimmed.slice(eqIndex + 1).trim();
        env[key] = value;
    }
    return env;
}

const env = loadEnv(ENV_PATH);

const CLOUD_NAME = env.CLOUDINARY_CLOUD_NAME;
const API_KEY = env.CLOUDINARY_API_KEY;
const API_SECRET = env.CLOUDINARY_API_SECRET;
const UPLOAD_PRESET = env.CLOUDINARY_UPLOAD_PRESET;
const FOLDER = env.CLOUDINARY_FOLDER;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.error('❌ Missing Cloudinary credentials in .env.local');
    process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Configuration
// ---------------------------------------------------------------------------
const SEQUENCE_DIR = join(ROOT, 'public', 'sequence2');
const DATA_DIR = join(ROOT, 'data');
const MANIFEST_PATH = join(DATA_DIR, 'cloudinary-manifest.json');
const CONCURRENCY = 5; // parallel uploads at a time
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// ---------------------------------------------------------------------------
// 3. Cloudinary signed upload helpers (no SDK needed)
// ---------------------------------------------------------------------------

function generateSignature(params) {
    // Sort params alphabetically, join as key=value&key=value, append api_secret
    const sorted = Object.keys(params)
        .sort()
        .map((k) => `${k}=${params[k]}`)
        .join('&');
    return createHash('sha1').update(sorted + API_SECRET).digest('hex');
}

async function uploadFileWithRetry(filePath, publicId, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await uploadFile(filePath, publicId);
        } catch (err) {
            if (attempt === retries) throw err;
            const delay = Math.pow(2, attempt) * 1000;
            console.warn(`  ⚠️  [Attempt ${attempt}] Failed ${publicId}: ${err.message}. Retrying in ${delay / 1000}s...`);
            await new Promise((r) => setTimeout(r, delay));
        }
    }
}

async function uploadFile(filePath, publicId) {
    const timestamp = Math.floor(Date.now() / 1000);

    // Cloudinary signature must include these specific parameters if sent
    const params = {
        folder: FOLDER,
        overwrite: 'true',
        public_id: publicId,
        timestamp: String(timestamp),
    };

    if (UPLOAD_PRESET) {
        params.upload_preset = UPLOAD_PRESET;
    }

    const signature = generateSignature(params);

    const fileBuffer = readFileSync(filePath);
    const blob = new Blob([fileBuffer], { type: 'image/jpeg' });

    const formData = new FormData();
    formData.append('file', blob, basename(filePath));
    formData.append('api_key', API_KEY);
    formData.append('signature', signature);

    for (const [key, value] of Object.entries(params)) {
        formData.append(key, value);
    }

    const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed for ${publicId}: ${response.status} ${errorText}`);
    }

    return response.json();
}

// ---------------------------------------------------------------------------
// 4. Batch upload with concurrency control
// ---------------------------------------------------------------------------

async function batchUpload(files) {
    const manifest = [];
    let completed = 0;
    const total = files.length;

    // Load existing manifest if resuming
    let existingMap = new Map();
    if (existsSync(MANIFEST_PATH)) {
        try {
            const existing = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
            for (const entry of existing) {
                existingMap.set(entry.index, entry);
            }
            console.log(`📋 Found existing manifest with ${existingMap.size} entries. Will skip already-uploaded frames.`);
        } catch {
            // Ignore corrupt manifest
        }
    }

    // Process in chunks
    for (let i = 0; i < files.length; i += CONCURRENCY) {
        const chunk = files.slice(i, i + CONCURRENCY);
        const promises = chunk.map(async ({ filePath, index }) => {
            // Skip if already uploaded
            if (existingMap.has(index)) {
                completed++;
                return existingMap.get(index);
            }

            const publicId = `frame-${String(index).padStart(3, '0')}`;

            try {
                const result = await uploadFileWithRetry(filePath, publicId);
                completed++;
                const pct = ((completed / total) * 100).toFixed(1);
                console.log(`  ✅ [${completed}/${total}] (${pct}%) ${publicId} → ${result.secure_url.slice(0, 80)}…`);

                return {
                    index,
                    publicId: result.public_id,
                    width: result.width,
                    height: result.height,
                    format: result.format,
                    bytes: result.bytes,
                    url: result.secure_url,
                };
            } catch (err) {
                completed++;
                console.error(`  ❌ [${completed}/${total}] Failed: ${publicId} — ${err.message}`);
                return null;
            }
        });

        const results = await Promise.all(promises);
        for (const r of results) {
            if (r) manifest.push(r);
        }

        // Save progress after each chunk (resume-safe)
        if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
        // Merge existing with new results
        const combinedManifest = [...existingMap.values(), ...manifest].filter((item, index, self) =>
            self.findIndex(t => t.index === item.index) === index
        );
        writeFileSync(MANIFEST_PATH, JSON.stringify(combinedManifest.sort((a, b) => a.index - b.index), null, 2));
    }

    return JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
}

// ---------------------------------------------------------------------------
// 5. Main
// ---------------------------------------------------------------------------

async function main() {
    console.log('');
    console.log('╔══════════════════════════════════════════════════╗');
    console.log('║   Pashmina Luxury — Cloudinary Batch Uploader   ║');
    console.log('╚══════════════════════════════════════════════════╝');
    console.log('');
    console.log(`  Cloud:    ${CLOUD_NAME}`);
    console.log(`  Folder:   ${FOLDER}`);
    console.log(`  Preset:   ${UPLOAD_PRESET || '(none)'}`);
    console.log(`  Source:   ${SEQUENCE_DIR}`);
    console.log(`  Manifest: ${MANIFEST_PATH}`);
    console.log('');

    // Gather files
    const allFiles = readdirSync(SEQUENCE_DIR)
        .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
        .sort()
        .map((f, i) => ({
            filePath: join(SEQUENCE_DIR, f),
            index: i + 1,
        }));

    console.log(`  Found ${allFiles.length} image frames to upload.`);
    console.log(`  Concurrency: ${CONCURRENCY} parallel uploads`);
    console.log('');

    const startTime = Date.now();
    const manifest = await batchUpload(allFiles);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('');
    console.log(`  ✨ Done! ${manifest.length}/${allFiles.length} frames uploaded in ${elapsed}s`);
    console.log(`  📄 Manifest saved to: ${MANIFEST_PATH}`);
    console.log('');
}

main().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
});
