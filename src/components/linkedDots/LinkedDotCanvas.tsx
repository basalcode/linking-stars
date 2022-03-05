/* packages */
import { useEffect, useMemo, useState } from 'react';

/* hooks */
import { useLinkedDotAnimation } from './LinkedDotCanvas.hook';

/* style */
import style from './LinkedDotCanvas.module.scss';

/* intefaces */
interface LinkedDotCanvasProps {
    dotAmount: number,
    canvasSize?: CanvasSize,
    dotSize?: DotSize,
    linkingRadius?: number,
    framePerSecond?: number,
    canvasColor?: string,
    dotColor?: string,
    lineColor?: string
}

export interface CanvasSize {
    width: number,
    height: number
}

export interface DotSize {
    width: number,
    height: number
}

const LinkedDotCanvas = ({
    dotAmount,
    canvasSize = { width: 500, height: 500 },
    dotSize = { width: 1, height: 1 },
    linkingRadius = 200,
    framePerSecond = 144,
    canvasColor = 'black',
    dotColor = 'white',
    lineColor = 'white'
}: LinkedDotCanvasProps) => {
    const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>();
    const context = useMemo(() => {
        if (!canvasElement) return null;

        const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

        return context;
    }, [canvasElement]);

    useEffect(() => {
        if (!canvasElement) return;
        console.log("canvasSize", canvasSize);


        canvasElement.style.width = `${canvasSize.width}`;
        canvasElement.style.height = `${canvasSize.height}`;
    }, [canvasElement, canvasSize]);

    useLinkedDotAnimation(context, dotAmount, canvasSize, dotSize, linkingRadius, framePerSecond, dotColor, lineColor);

    return (
        <canvas
            className={style.canvas}
            ref={setCanvasElement}
            width={canvasSize.width}
            height={canvasSize.height}
            style={{ backgroundColor: `${canvasColor}` }}
        />
    );
}

export default LinkedDotCanvas;
