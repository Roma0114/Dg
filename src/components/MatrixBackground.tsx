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

        // TypeScript'in katı kuralları: Canvas veya 2D context henüz yüklenmediyse işlemi durdur
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
        const fontSize = 16;
        const columns = canvas.width / fontSize;

        // drops dizisinin sadece sayılardan (number) oluşacağını belirtiyoruz
        const drops: number[] = Array(Math.floor(columns)).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = color; // Rengi prop'tan alıyoruz
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        return () => clearInterval(interval);
    }, [color]); // Renk değişirse efekti yeniden başlat

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                display: 'block',
                background: '#000'
            }}
        />
    );
};

export default MatrixBackground;