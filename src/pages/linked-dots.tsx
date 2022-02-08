import type { NextPage } from 'next'
import { useEffect, useMemo, useRef } from 'react';

import Layout from '../components/common/Layout';

import style from './linked-dots.module.scss';

const LinkedDots: NextPage = () => {
    useEffect(() => {
        const canvasElement = document.getElementById("linkedDotsCanvas");
        const context = canvasElement.getContext('2d');

        const pointAmount = 10;
        const width = canvasElement.clientWidth;
        const height = canvasElement.clientHeight;
        console.log("width", width);
        console.log("height", height);

        for (let i = 0; i < pointAmount; i++) {
            const randomX = Math.floor(Math.random() * width);
            const randomY = Math.floor(Math.random() * height);
            console.log("randomX", randomX, "randomY", randomY);

            context.rect(randomX, randomY, 1, 1);
        }
        context.fill();
    }, []);

    return (
        <Layout>
            <canvas
                id="linkedDotsCanvas"
                className={style.canvas}
            ></canvas>
        </Layout>
    );
}

export default LinkedDots;