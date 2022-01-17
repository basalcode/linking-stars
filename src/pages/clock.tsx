import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

import Layout from '../components/common/Layout';

const Clock: NextPage = () => {
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        setTimeout(() => {
            setTime(Date.now());
        }, 1000);
    }, [time]);

    return (
        <Layout>
            {time}
        </Layout>
    );
}

export default Clock; 