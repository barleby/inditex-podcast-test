import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink, withRouter } from 'react-router-dom';
import AppContext from '../context/contextProvider';
import { Home } from './Home';
import { Podcast } from './Podcast';

const Header = () => {

    const state = useContext(AppContext);

    return (
        <h3>
            <header>
                <NavLink to="/" activeClassName={'homeLinkActive'} className={'homeLink'}>Podcaster</NavLink>
                {state.isNavigating && <div>Cargando <span id="loaderDot"></span></div>}
            </header>
        </h3>
  );
}
const Nav = ({...props}) => {
    const state = useContext(AppContext);

    useEffect(() => props.history.listen((location, action) => {
        state.handleLoader(true);
      }));
    return (
        <div>
           {props.children}
        </div>
    )
};
const ConHistoria = withRouter(Nav);

const Routes = () => {

    return (
        <BrowserRouter>
          <ConHistoria>
            <Header />
            <Switch>
              <Route path="/" component={Home} exact={true} />
              <Route path="/podcast/:id" component={Podcast} />
            </Switch>
          </ConHistoria>
        </BrowserRouter>
    );
}
export {Routes}
