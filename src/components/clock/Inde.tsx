import { FunctionComponent, useEffect, useState } from 'react';

import Layout from 'components/common/Layout';
import NumberLED from 'components/common/NumberLED';

import style from './index.module.scss';

const getTimeElements = (): string[] => {
    const now = new Date();
    const hour = now.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 });
    const minute = now.getMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 });
    const second = now.getSeconds().toLocaleString(undefined, { minimumIntegerDigits: 2 });

    const currentTime: string = `${hour}${minute}${second}`;
    const splitedCurrentTime = currentTime.split("");

    return splitedCurrentTime;
}

const Index: FunctionComponent = () => {
    const [time, setTime] = useState<string[]>(getTimeElements());

    useEffect(() => {
        setTimeout(() => {
            setTime(getTimeElements());
        }, 1000);
    }, [time]);

    return (
        <Layout>
            <div className={style.container}>
                <NumberLED
                    value={Number(time[0])}
                    lineLength={10}
                    thickness={2}
                />
                <NumberLED
                    value={Number(time[1])}
                    lineLength={10}
                    thickness={2}
                />
                <div className="colon">:</div>
                <NumberLED
                    value={Number(time[2])}
                    lineLength={10}
                    thickness={2}
                />
                <NumberLED
                    value={Number(time[3])}
                    lineLength={10}
                    thickness={2}
                />
                <div className="colon">:</div>
                <NumberLED
                    value={Number(time[4])}
                    lineLength={10}
                    thickness={2}
                />
                <NumberLED
                    value={Number(time[5])}
                    lineLength={10}
                    thickness={2}
                />
            </div>
        </Layout>
    );
}

export default Index;