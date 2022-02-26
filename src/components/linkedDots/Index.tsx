/* packages */
import { FunctionComponent } from 'react';

/* components */
import Layout from 'components/common/Layout';
import LinkedDotCanvas from './LinkedDotCanvas';

/* style */
import style from './Index.module.scss';

const Index: FunctionComponent = () => {
    return (
        <Layout>
            <LinkedDotCanvas
                pointAmount={10}
                canvasWidth={500}
                cavnasHeight={500}
                pointWidth={5}
                pointHeight={5}
                framePerSecond={144}
            />
        </Layout>
    );
}

export default Index;