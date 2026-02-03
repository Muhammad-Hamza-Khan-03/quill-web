'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useSpring } from 'framer-motion';

const FRAME_COUNT = 240;

const generateFramePaths = () => {
    const paths = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
        const paddedIndex = i.toString().padStart(3, '0');
        paths.push(`/sequence2/ezgif-frame-${paddedIndex}.jpg`);
    }
    return paths;
};

const IMAGES = generateFramePaths();

export default function ScrollyCanvas({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const currentFrameRef = useRef(0);

    // Track scroll progress within the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the scroll value for cinematic feel
    // Reduced stiffness/damping for slightly looser, more "heavy" feel appropriate for luxury
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 40,
        restDelta: 0.001
    });

    useEffect(() => {
        // Preload all images
        // In a real optimized app, we might lazy load or chunk load these.
        // For 240 frames, we'll try to load them all but render as soon as the first few are ready.

        const imgs: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
        let loadedCount = 0;

        IMAGES.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                imgs[index] = img;
                loadedCount++;
                // We can consider "loaded" when a significant portion is ready, or just the first few
                // For simplicity, let's say we are "ready" to start rendering once we have the first frame
                // But we mark "imagesLoaded" true only when we have enough to avoid flickering.
                // Let's mark true when 20% are loaded to start showing *something* safely.
                if (loadedCount === 1 || loadedCount === Math.floor(FRAME_COUNT * 0.2) || loadedCount === FRAME_COUNT) {
                    setImagesLoaded(true);
                    // Force a re-render/draw if we happen to be on this frame
                    if (index === currentFrameRef.current) {
                        drawFrame(index);
                    }
                }
            };

            // Fallback/Placeholder
            img.onerror = () => {
                console.warn(`Failed to load frame ${index}: ${src}`);
            }
        });

        imageRefs.current = imgs;
    }, []);

    const drawFrame = (frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Safety check bound
        if (frameIndex < 0) frameIndex = 0;
        if (frameIndex >= FRAME_COUNT) frameIndex = FRAME_COUNT - 1;

        // Save current frame for resize events
        currentFrameRef.current = frameIndex;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = imageRefs.current[frameIndex];

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#04070B'; // Deep blue black background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (!img) {
            // If specific frame not loaded, try to find nearest loaded neighbor? 
            // Or just wait. For now, we'll just keep the background.
            return;
        }

        // Logic - "Cover" fit
        const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(
            img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
    };

    useEffect(() => {
        const resizeCanvas = () => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            drawFrame(currentFrameRef.current);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Render loop triggered by scroll changes
        const unsubscribe = smoothScroll.on("change", (latest) => {
            // latest is 0 to 1
            const frameIndex = Math.floor(latest * (FRAME_COUNT - 1));
            drawFrame(frameIndex);
        });

        // Initial draw
        drawFrame(0);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            unsubscribe();
        };
    }, [imagesLoaded, smoothScroll]); // Re-attach listener if load state changes to ensure we are drawing

    return (
        <div ref={containerRef} className="h-[600vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="block w-full h-full" />

                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#04070B]/5 to-[#04070B]/60 pointer-events-none" />
            </div>

            {/* Scroll-driven Content Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {children}
            </div>
        </div>
    );
}
