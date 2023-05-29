import config from 'config';
import { accountService } from '@/_services';

export const fetchWrapper = {
	getPing,
	get,
    post,
    put,
    delete: _delete
}

// Sending a Ping to the Node Server and gets the Pong by calling the function "handleResponse" which returns the 
// message / error back to index.js by account.service.js
function getPing(url) {
	
	console.log( 'FETCH-WRAPPER => Sending the Ping to the Node Server ... ' ); 
	
    const requestOptions = {
        method: 'GET'
    };
    return fetch(url, requestOptions).then(handleResponse);
}



function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}


function post(url, body) {
	
	//console.log( 'FETCH-WRAPPER => posting url and body ... ' + JSON.stringify( body )); 
		
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}



function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = accountService.userValue;
    const isLoggedIn = user && user.jwtToken;
    const isApiUrl = url.startsWith(config.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.jwtToken}` };
    } else {
        return {};
    }
}


function handleResponse(response) {
			
    return response.text().then(text => {
		
        const data = text && JSON.parse(text);
        		
        if (!response.ok) {
			
            if ([401, 403].includes(response.status) && accountService.userValue) {
				
                // Auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                accountService.logout();
            }
           					   
		    var error = "Please try again, there was an error - default!";
			error = (data && data.message) || response.statusText;
						
			// 29-07-23 - Testing ...
			// Error data: {"message":"Cannot read property 'scope' of undefined"}  =>
			// Error statusText: Internal server error 
			
			//alert( 'Error data: ' + JSON.stringify(data));
			//alert( 'Error status Text: ' + response.statusText );
			//alert( 'Error status code: ' + response.status );
			
			// May happen when the node app wakes up from idle mode - first time 
            // For testing the error can be fired by stop / start the node app which will return a 500 status code !			
			if( response.status >= 500 )
				error = "Please try again, most likely the Web API just needs to wake up from idle mode ...";
			
            return Promise.reject(error);
        }

        return data;
    });

}