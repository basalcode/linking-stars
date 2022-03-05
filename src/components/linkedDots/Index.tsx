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
    const [canvasSize, setCanavsSize] = useState<CanvasSize>({ width: 500, height: 500 });

    return (
        <LinkedDotCanvas
            dotAmount={50}
            canvasSize={canvasSize}
            dotSize={{
                width: 3,
                height: 3
            }}
            linkingRadius={200}
            framePerSecond={144}
        />
    );
}

export default Index;