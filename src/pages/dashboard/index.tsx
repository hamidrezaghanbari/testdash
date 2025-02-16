import { NavLink } from 'react-router-dom';

import { Page } from '$/layouts';

function Home() {
  return (
    <Page>
      <div className="p-4">
        <NavLink to="/product/1/about">go to about</NavLink>
        <NavLink to="/product/1/contact">go to contact</NavLink>
      </div>
    </Page>
  );
}

export default Home;
