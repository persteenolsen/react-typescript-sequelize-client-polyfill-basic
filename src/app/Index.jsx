import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import { Nav, PrivateRoute, Alert } from '@/_components';
import { Home } from '@/home';
import { Profile } from '@/profile';

import { Admin } from '@/admin';

import { Account } from '@/account';


import { AboutPage } from '@/AboutPage';
import { MyInfoPage } from '@/MyInfoPage';
import { ErrorPage } from '@/ErrorPage';

function App() {
    const { pathname } = useLocation();  
    const [user, setUser] = useState({});

    useEffect(() => {
        
		// Note: Unsubscribe ( to avoid memoryleaks ) needs to be without return because using
		// return will cause a "minor" error in the Chrome console
		const subscription = accountService.user.subscribe(x => setUser(x));
        subscription.unsubscribe;
		
		// return subscription.unsubscribe;

    }, []);

    return (
        <div className={'app-container' + (user && ' bg-light')}>
            <Nav />
            <Alert />
            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
                <Route path="/account" component={Account} />

				<Route exact path="/about" component={AboutPage} />
				<Route exact path="/persteenolsen" component={MyInfoPage} />
				
				<Route path="*" component={ErrorPage} />

				
            </Switch>
        </div>
    );
}

export { App }; 