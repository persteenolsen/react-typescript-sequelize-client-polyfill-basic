import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Overview } from './Overview';

// To avoid TS Error it is needed to define the full path to the Index.jsx in the users folder because this file here have the same name !
import { Users } from './users/Index.jsx';

function Admin({ match }) {
    const { path } = match;

    return (
        <div className="p-4">
            <div className="container">
                <Switch>
                    <Route exact path={path} component={Overview} />
                    <Route path={`${path}/users`} component={Users} />
                </Switch>
            </div>
        </div>
    );
}

export { Admin };