/* packages */
import { FunctionComponent, ReactNode, useEffect, useState } from 'react';

/* types */
import { CanvasSize } from './LinkingStarCanvas';

/* components */
import LinkedDotCanvas from './LinkingStarCanvas';

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
            dotSize={{ width: 1, height: 1 }}
            linkingRadius={200}
            framePerSecond={144}
            speedPerSecond={0.4}
            canvasColor={'black'}
            dotColor={'white'}
            lineColor={'white'}
        />
    );
}















export default Index;