import type { NextPage } from 'next'
import { useEffect, useRef } from 'react';

import Layout from '../components/common/Layout';

import style from './linked-dots.module.scss';

const LinkedDots: NextPage = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef?.current) return;

        const canvasElement = canvasRef.current;
        const context = canvasElement.getContext('2d');

        const pointAmount = 10;

        const width = canvasElement.clientWidth;
        const height = canvasElement.clientHeight;

        for (let i = 0; i < pointAmount; i++) {
            const randomHeight = Math.random() * height;
            const randomWidth = Math.random() * width;

            context.fillRect(randomHeight, randomWidth, 1, 1);
        }

    }, [canvasRef]);

    return (
        <Layout>
            <canvas
                id="canvas"
                ref={canvasRef}
                className={style.canvas}
            ></canvas>
        </Layout>
    );
}

export default LinkedDots;