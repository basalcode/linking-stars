import type { NextPage } from 'next'

import Header from './Header';
import Navigation from './Navigation';

const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <Header />
      <Navigation />
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;
