import type { NextPage } from 'next'
import Link from 'next/link';
import { FunctionComponent } from 'react';

import style from './Navigation.module.scss';

const Navigation: FunctionComponent = () => {
    return (
        <nav className={style.navigation}>
            <Link
                href="/"
            >
                <a className={style.link}>Home</a>
            </Link>
            <Link
                href="/clock"
            >
                <a className={style.link}>Clock</a>
            </Link>
            <Link
                href="/linked-dots"
            >
                <a className={style.link}>LinkedDots</a>
            </Link>
        </nav>
    );
}

export default Navigation;
