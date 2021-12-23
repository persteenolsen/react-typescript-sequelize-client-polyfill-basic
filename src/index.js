import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';

import { history } from './_helpers';
import { accountService } from './_services';


// To avoid TS Error it is needed to speficy the full path to Index.jsx in app folder because it imports everything 
// from admin folder which contains a Index.jsx file and another Index.jsx in user folder !
import { App } from './app/Index.jsx';

// Note: Using an Alias in Webpack
import 'styles/index.scss';

// Note: Give a wake up ping to the server ( at Azure ) from the idle mode and get the response value "hello" in x.message !
 accountService.pingServer()
 .then( pong => {
	  
	  // Take a look at the Crome Developer Console 
	  console.log( 'INDEX => Pong from the Node Server: ' + pong.message );
	 });

// Starting the App  !
startApp(); 


function startApp() { 
    render(
        <Router history={history}>
            <App />
        </Router>,
        document.getElementById('app')
    );
}

// Note: Before npm run build the statement module.hot.accept(); could / should to be disabled / comment out !!!
// In Webpck HotModuleReplacementPlugin() is used to set hot to true. 
// This way the browser dont need to reload the entire page when changing  file !
// Note: Needed here - in contrast to Vue.js  !!
 if (module.hot) {
    module.hot.accept();
 }


