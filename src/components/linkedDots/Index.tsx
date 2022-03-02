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
                pointAmount={50}
                canvasWidth={740}
                cavnasHeight={740}
                pointWidth={5}
                pointHeight={5}
                framePerSecond={144}
            />
        </Layout>
    );
}

export default Index;