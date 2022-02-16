import { FunctionComponent, useEffect, useMemo, useState } from 'react';

import Layout from 'components/common/Layout';

import style from './Index.module.scss';

interface Dot {
    x: number,
    y: number,
    degree: number,
}

const Index: FunctionComponent = () => {
    const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [dots, setDots] = useState<Array<Dot>>([]);

    const pointAmount: number = 10;

    useEffect(() => {
        if (!canvasElement) return;
        const context: CanvasRenderingContext2D | null = canvasElement.getContext('2d');

        if (!canvasElement) return;
        if (!context) return;

        setContext(context);

        const width: number = canvasElement.width;
        const height: number = canvasElement.height;

        for (let i = 0; i < pointAmount; i++) {
            const x: number = Math.floor(Math.random() * width);
            const y: number = Math.floor(Math.random() * height);
            const radian: number = Math.random() * (Math.PI * 2);
            const degree: number = radian / Math.PI * 180;

            const dot: Dot = {
                x: x,
                y: y,
                degree: degree
            }

            dots.push(dot);

            context?.strokeRect(x, y, 1, 1);
        }

        return () => { context.clearRect(0, 0, width, height); }
    }, [canvasElement]);

    const framePerSecond = 144;
    const secondUnit = 1000;
    const secondPerFrame = secondUnit / framePerSecond;

    useEffect(() => {
        setTimeout(() => {
            const newDots = dots.map((dot: Dot) => {
                const newX: number = dot.x + 1;
                const newY: number = dot.y + 1;

                const newDot = { x: newX, y: newY, degree: 0 };
                context?.beginPath();
                context?.rect(newX, newY, 1, 1);
                context?.stroke();
                return newDot;
            });

            setDots(newDots);
        }, secondPerFrame);
    }, [dots]);

    return (
        <Layout>
            <canvas
                width={500}
                height={500}
                ref={element => setCanvasElement(element)}
            ></canvas>
        </Layout>
    );
}

export default Index;