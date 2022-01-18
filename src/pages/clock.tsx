import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

import Layout from '../components/common/Layout';

const Clock: NextPage = () => {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        setTimeout(() => {
            const now = new Date();
            const hour = now.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 });
            const minute = now.getMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 });
            const second = now.getSeconds().toLocaleString(undefined, { minimumIntegerDigits: 2 });

            const timeString = `${hour}:${minute}:${second}`;

            setTime(timeString);
        }, 1000);
    }, [time]);

    return (
        <Layout>
            {time}
        </Layout>
    );
}

export default Clock; 