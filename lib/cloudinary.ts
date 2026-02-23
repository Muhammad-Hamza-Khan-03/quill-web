/**
 * Cloudinary URL Builder
 * ======================
 * Constructs responsive, optimized Cloudinary delivery URLs.
 * Uses on-the-fly transformations for:
 *   - Device-appropriate width (responsive)
 *   - Auto format (WebP/AVIF when supported)
 *   - Auto quality (perceptual optimization)
 *   - DPR-aware delivery
 */

// Exposed to client via NEXT_PUBLIC_ prefix
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';

if (!CLOUD_NAME && typeof window !== 'undefined') {
    console.warn('[cloudinary] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set');
}

/**
 * Responsive breakpoints used for srcSet generation.
 * These match common device widths to avoid serving oversized images.
 */
export const RESPONSIVE_WIDTHS = [640, 750, 828, 1080, 1200, 1440, 1920, 2048] as const;

export interface CloudinaryTransformOptions {
    /** Desired width in CSS pixels */
    width?: number;
    /** Desired height in CSS pixels */
    height?: number;
    /** Device pixel ratio (1, 2, 3) */
    dpr?: number;
    /** Quality: 'auto', 'auto:low', 'auto:eco', 'auto:good', 'auto:best', or 1-100 */
    quality?: string | number;
    /** Format: 'auto', 'webp', 'avif', 'jpg', 'png' */
    format?: string;
    /** Crop mode */
    crop?: 'fill' | 'fit' | 'scale' | 'limit' | 'thumb';
    /** Gravity (for crop) */
    gravity?: 'auto' | 'center' | 'face' | 'faces';
}

/**
 * Build a Cloudinary delivery URL with transformations.
 *
 * @param publicId - The Cloudinary public ID (e.g., "quill-landing-page/frame-001")
 * @param options  - Transformation options
 * @returns Full Cloudinary URL string
 */
export function buildCloudinaryUrl(
    publicId: string,
    options: CloudinaryTransformOptions = {}
): string {
    if (!CLOUD_NAME) {
        // Fallback: return a placeholder or empty string in SSR/missing config
        return '';
    }

    const {
        width,
        height,
        dpr,
        quality = 90,
        format = 'auto',
        crop = 'fill',
        gravity = 'auto',
    } = options;

    // Build transformation segments
    const transforms: string[] = [];

    // Sharpening for high-end detail
    transforms.push('e_sharpen:50');

    // Quality
    transforms.push(`q_${quality}`);

    // Format
    transforms.push(`f_${format}`);

    // Crop + gravity (only if width/height specified)
    if (width || height) {
        transforms.push(`c_${crop}`);
        transforms.push(`g_${gravity}`);
    }

    // Dimensions
    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`);

    // DPR
    if (dpr && dpr > 1) transforms.push(`dpr_${dpr}`);

    const transformString = transforms.join(',');

    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/${publicId}`;
}

/**
 * Generate an array of srcSet entries for responsive images.
 * Useful for <image srcSet="..."> or programmatic selection.
 *
 * @param publicId - Cloudinary public ID
 * @param baseOptions - Base transform options (quality, format, crop, etc.)
 * @returns Array of { url, width } sorted by width ascending
 */
export function buildResponsiveSrcSet(
    publicId: string,
    baseOptions: Omit<CloudinaryTransformOptions, 'width'> = {}
): { url: string; width: number }[] {
    return RESPONSIVE_WIDTHS.map((w) => ({
        url: buildCloudinaryUrl(publicId, { ...baseOptions, width: w }),
        width: w,
    }));
}

/**
 * Select the optimal width from RESPONSIVE_WIDTHS for a given viewport + DPR.
 * Returns the smallest breakpoint that covers the viewport.
 *
 * @param viewportWidth - CSS pixel width of the viewport
 * @param dpr - Device pixel ratio (defaults to 1)
 * @returns The selected width breakpoint
 */
export function selectOptimalWidth(viewportWidth: number, dpr: number = 1): number {
    const targetPixels = viewportWidth * dpr;
    // Find smallest breakpoint >= target
    for (const w of RESPONSIVE_WIDTHS) {
        if (w >= targetPixels) return w;
    }
    // Fallback to largest
    return RESPONSIVE_WIDTHS[RESPONSIVE_WIDTHS.length - 1];
}
