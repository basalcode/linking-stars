import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

import Layout from '../components/common/Layout';
import NumberLED from 'components/common/NumberLED';

import style from './clock.module.scss';

const Clock: NextPage = () => {
    const [time, setTime] = useState<string[]>([]);

    useEffect(() => {
        setTimeout(() => {
            const now = new Date();
            const hour = now.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 });
            const minute = now.getMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 });
            const second = now.getSeconds().toLocaleString(undefined, { minimumIntegerDigits: 2 });

            const currentTime: string = `${hour}${minute}${second}`;
            const splitedCurrentTime = currentTime.split("");

            setTime(splitedCurrentTime);
        }, 1000);
    }, [time]);


    return (
        <Layout>
            <div className={style.container}>
                <NumberLED
                    value={Number(time[0])}
                    x={0}
                    y={0}
                    width={5}
                    height={10}
                    thickness={2}
                />
                <NumberLED
                    value={Number(time[1])}
                    x={0}
                    y={0}
                    width={5}
                    height={10}
                    thickness={2}
                />
                <div className="colon">:</div>
                <NumberLED
                    value={Number(time[2])}
                    x={0}
                    y={0}
                    width={5}
                    height={10}
                    thickness={2}
                />
                <NumberLED
                    value={Number(time[3])}
                    x={0}
                    y={0}
                    width={5}
                    height={10}
                    thickness={2}
                />
                <div className="colon">:</div>
                <NumberLED
                    value={Number(time[4])}
                    x={0}
                    y={0}
                    width={5}
                    height={10}
                    thickness={2}
                />
                <NumberLED
                    value={Number(time[5])}
                    x={0}
                    y={0}
                    width={5}
                    height={10}
                    thickness={2}
                />
            </div>
        </Layout>
    );
}

export default Clock;