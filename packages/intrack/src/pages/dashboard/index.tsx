import { NavLink } from 'react-router-dom';

import { Page } from '$/layouts';

function Home() {
  return (
    <Page>
      <div className="p-4">
        <NavLink to="/about">go to about</NavLink>
        <NavLink to="/contact">go to contact</NavLink>
      </div>
    </Page>
  );
}

export default Home;
