/* packages */
import { FunctionComponent, useEffect, useState } from 'react';

/* types */
import { CanvasSize } from './LinkedDotCanvas';

/* components */
import Layout from 'components/common/Layout';
import LinkedDotCanvas from './LinkedDotCanvas';

/* style */
import style from './Index.module.scss';

const Index: FunctionComponent = () => {
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });

    useEffect(() => {
        setCanvasSize({
            width: window.innerWidth,
            height: window.innerHeight
        });

        const onResize = () => {
            setCanvasSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <LinkedDotCanvas
            canvasSize={canvasSize}
            dotAmount={300}
        />
    );
}

export default Index;