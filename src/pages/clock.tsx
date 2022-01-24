import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

import Layout from '../components/common/Layout';
import NumberLED from 'components/common/NumberLED';

import style from './clock.module.scss';

const Clock: NextPage = () => {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        setTimeout(() => {
            const now = new Date();
            const hour = now.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 });
            const minute = now.getMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 });
            const second = now.getSeconds().toLocaleString(undefined, { minimumIntegerDigits: 2 });

            const currentTime: string = `${hour}:${minute}:${second}`;

            setTime(currentTime);
        }, 1000);
    }, [time]);

    return (
        <Layout>
            <p className={style.timeText}>
                {time}
            </p>
            <NumberLED />
        </Layout>
    );
}

export default Clock; 