import { FunctionComponent, useEffect, useMemo, useState } from 'react';

import Layout from 'components/common/Layout';

import style from './Index.module.scss';

interface dot {
    x: number,
    y: number,
    degree: number,
}

const Index: FunctionComponent = () => {
    const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasElement) return;
        const context: CanvasRenderingContext2D | null = canvasElement.getContext('2d');

        if (!canvasElement) return;
        if (!context) return;
        const pointAmount: number = 10;

        const width: number = canvasElement.width;
        const height: number = canvasElement.height;

        const dots: Array<dot> = [];

        for (let i = 0; i < pointAmount; i++) {
            const x: number = Math.floor(Math.random() * width);
            const y: number = Math.floor(Math.random() * height);
            const radian: number = Math.random() * (Math.PI * 2);
            const degree: number = radian / Math.PI * 180;

            const dot: dot = {
                x: x,
                y: y,
                degree: degree
            }

            dots.push(dot);

            console.log(degree);

            context?.strokeRect(x, y, 1, 1);
        }

        return () => { context.clearRect(0, 0, width, height); }
    }, [canvasElement]);

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