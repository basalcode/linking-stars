import type { NextPage } from 'next'
import { useEffect, useRef } from 'react';

import Layout from '../components/common/Layout';

import style from './linked-dots.module.scss';

const LinkedDots: NextPage = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef?.current) return;

        const canvasElement = canvasRef.current;



    }, [canvasRef]);

    return (
        <Layout>
            <canvas
                className={style.canvas}
            ></canvas>
        </Layout>
    );
}

export default LinkedDots;