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
    return (
        <LinkedDotCanvas
            pointAmount={50}
            pointWidth={5}
            pointHeight={5}
            linkingRadius={200}
            framePerSecond={144}
        />
    );
}

export default Index;