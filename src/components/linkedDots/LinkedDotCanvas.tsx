/* packages */
import { useEffect, useMemo, useState } from 'react';

/* hooks */
import { useLinkedDotAnimation } from './LinkedDotCanvas.hook';

/* style */
import style from './LinkedDotCanvas.module.scss';

/* intefaces */
interface LinkedDotCanvasProps {
    pointAmount: number,
    canvasSize?: CanvasSize,
    pointSize?: PointSize,
    pointWidth?: number,
    pointHeight?: number,
    linkingRadius?: number,
    framePerSecond?: number
}

export interface CanvasSize {
    width: number,
    height: number
}

export interface PointSize {
    width: number,
    height: number
}

const LinkedDotCanvas = ({
    pointAmount,
    canvasSize = { width: 500, height: 500 },
    pointSize = { width: 1, height: 1 },
    linkingRadius = 200,
    framePerSecond = 144
}: LinkedDotCanvasProps) => {
    const setCanvasElement = useLinkedDotAnimation(pointAmount, pointSize.width, pointSize.height, linkingRadius, framePerSecond);

    return (
        <canvas
            className={style.canvas}
            ref={setCanvasElement}
            width={canvasSize.width}
            height={canvasSize.height}
        />
    );
}

export default LinkedDotCanvas;
