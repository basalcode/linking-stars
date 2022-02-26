/* hooks */
import { useLinkedDotAnimation } from './LinkedDotCanvas.hook';

/* style */
import style from './LinkedDotCanvas.module.scss';

/* intefaces */
interface LinkedDotCanvasProps {
    pointAmount: number,
    canvasWidth: number,
    cavnasHeight: number,
    pointWidth: number,
    pointHeight: number,
    framePerSecond: number
}

const LinkedDotCanvas = ({ pointAmount, canvasWidth = 500, cavnasHeight = 500, pointWidth = 1, pointHeight = 1, framePerSecond = 144 }: LinkedDotCanvasProps) => {
    const setCanvasElement = useLinkedDotAnimation(pointAmount, pointWidth, pointHeight, framePerSecond);

    return (
        <canvas
            className={style.canvas}
            ref={setCanvasElement}
            width={canvasWidth}
            height={cavnasHeight}
        />
    );
}

export default LinkedDotCanvas;
