import type { NextPage } from 'next'

import Header from './Header';
import Navigation from './Navigation';

import style from './Layout.module.scss';
import { FunctionComponent, ReactNode } from 'react';

interface Props {
  children?: ReactNode
}

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className={style.layout}>
      <Header />
      <Navigation />
      <main className={style.main}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
