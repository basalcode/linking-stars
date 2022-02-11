import { FunctionComponent, useEffect, } from 'react';

import Layout from 'components/common/Layout';

import style from './Index.module.scss';

const Index: FunctionComponent = () => {
    useEffect(() => {
        const canvasElement = document.getElementById("linkedDotsCanvas") as HTMLCanvasElement;
        const context = canvasElement.getContext('2d');

        const pointAmount = 10;
        const width: number = canvasElement?.clientWidth;
        const height: number = canvasElement?.clientHeight;

        for (let i = 0; i < pointAmount; i++) {
            const randomX = Math.floor(Math.random() * width);
            const randomY = Math.floor(Math.random() * height);
            console.log("randomX", randomX, "randomY", randomY);

            context?.rect(randomX, randomY, 1, 1);
        }
        context?.fill();
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

export default Index;