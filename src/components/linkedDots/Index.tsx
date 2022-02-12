import { FunctionComponent, useEffect, useMemo, useState } from 'react';

import Layout from 'components/common/Layout';

import style from './Index.module.scss';

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

        for (let i = 0; i < pointAmount; i++) {


            const randomX = Math.floor(Math.random() * width);
            const randomY = Math.floor(Math.random() * height);

            context?.strokeRect(randomX, randomY, 1, 1);
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