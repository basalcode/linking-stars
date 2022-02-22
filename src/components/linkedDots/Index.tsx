import { FunctionComponent } from 'react';

import { useIndex } from './Index.hook';

import Layout from 'components/common/Layout';

import style from './Index.module.scss';

const Index: FunctionComponent = () => {
    const setCanvasElement = useIndex();

    return (
        <Layout>
            <canvas
                className={style.canvas}
                width={500}
                height={500}
                ref={setCanvasElement}
            ></canvas>
        </Layout>
    );
}

export default Index;