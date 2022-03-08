/* packages */
import { FunctionComponent, ReactNode, useEffect, useState } from 'react';

/* types */
import { CanvasSize } from './LinkedDotCanvas';

/* components */
import LinkedDotCanvas from './LinkedDotCanvas';

/* style */
import style from './Index.module.scss';

const Index: FunctionComponent = () => {
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });

    useEffect(() => {
        const onResize = () => setCanvasSize({
            width: window.innerWidth,
            height: window.innerHeight
        });

        onResize();

        window.addEventListener('resize', onResize);

        const htmlElement = document.querySelector('html') as HTMLElement;
        htmlElement.style.overflow = "hidden"

        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <LinkedDotCanvas
            canvasSize={canvasSize}
            dotAmount={100}
        />
    );
}

export default Index;