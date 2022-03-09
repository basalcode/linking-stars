/* packages */
import { useMemo, useState } from 'react';

/* hooks */
import { useLinkedDotAnimation } from './LinkingStarCanvas.hook';

/* intefaces */
interface LinkedDotCanvasProps {
    canvasSize: CanvasSize,
    dotAmount?: number,
    dotSize?: DotSize,
    linkingRadius?: number,
    framePerSecond?: number,
    speedPerSecond?: number,
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
    canvasSize,
    dotAmount = 50,
    dotSize = { width: 1, height: 1 },
    linkingRadius = 200,
    framePerSecond = 144,
    speedPerSecond = 0.4,
    canvasColor = 'black',
    dotColor = 'white',
    lineColor = 'white'
}: LinkedDotCanvasProps) => {
    const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);

    const context = useMemo(() => {
        if (!canvasElement) return null;

        const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

        return context;
    }, [canvasElement]);

    useLinkedDotAnimation(context, dotAmount, canvasSize, dotSize, linkingRadius, framePerSecond, speedPerSecond, dotColor, lineColor);

    return (
        <canvas
            ref={setCanvasElement}
            width={canvasSize.width}
            height={canvasSize.height}
            style={{ backgroundColor: `${canvasColor}` }}
        />
    );
}

export default LinkedDotCanvas;
