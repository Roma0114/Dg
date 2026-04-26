import React, { useEffect, useRef } from 'react';

// Bileşenin dışarıdan alabileceği özellikleri (props) ve tiplerini belirliyoruz
interface MatrixBackgroundProps {
    color?: string; // Soru işareti (?) bu prop'un zorunlu olmadığını belirtir
}

const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ color = '#FF107A' }) => {
    // TypeScript'e bu referansın bir Canvas elementi (veya başlangıçta null) olduğunu söylüyoruz
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const fontSize = 16;
        let drops: number[] = [];

        const updateDimensions = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;

                const newColumns = Math.floor(width / fontSize) + 1; // +1 to ensure we cover the edge
                const newDrops = Array(newColumns).fill(1);

                // Keep existing drops if possible to avoid reset flickering
                if (drops.length > 0) {
                    for (let i = 0; i < Math.min(drops.length, newColumns); i++) {
                        newDrops[i] = drops[i];
                    }
                }

                drops = newDrops;
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

        const draw = () => {
            // Re-verify dimensions in case resize event didn't fire or layout changed
            updateDimensions();

            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = color;
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                // Draw characters
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', updateDimensions);
        };
    }, [color]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                display: 'block',
                background: '#000',
                margin: 0,
                padding: 0
            }}
        />
    );
};

export default MatrixBackground;