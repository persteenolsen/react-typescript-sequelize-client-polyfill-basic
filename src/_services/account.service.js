import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

// Note: Using localStorage for keeping the User logged in when Browser Refresh of the pages
const userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));
 
const baseUrl = `${config.apiUrl}/accounts`;

// Make the functions available for function calls in other modules when import the accountService 
export const accountService = {
	pingServer,
    login,
    logout,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
};

// Note: Give a wake up ping to the server at Azure from the idle mode and get the response value "hello" from the variable "message"
function pingServer() {
	 	
    return fetchWrapper.getPing(`${config.apiUrl}/hello`)
	
	.then( pong => {
		
		 // Take a look at the Crome Developer Console 
		 console.log( 'ACCOUNT.SERVICE => Pong from the Node Server: ' + pong.message );
			 
		 return pong;
      });
 }
 
 
// Performing Login - Saving the User in localStorage - publish User to subscribers - Return the User
function login(email, password) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { email, password })
        .then(user => {
            
			// Note: Store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
		  
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);

            return user;
        });
}

// NOTE: No use of the RefreshToken in this React Client !
function logout() {
	
	 // Note: Remove user from local storage and publish null to user subject
    localStorage.removeItem('user');
	
    userSubject.next(null);
    history.push('/account/login');
   // history.push('/about');
	
}

function register(params) {
    return fetchWrapper.post(`${baseUrl}/register`, params);
}

function verifyEmail(token) {
    return fetchWrapper.post(`${baseUrl}/verify-email`, { token });
}

function forgotPassword(email) {
    return fetchWrapper.post(`${baseUrl}/forgot-password`, { email });
}

function validateResetToken(token) {
    return fetchWrapper.post(`${baseUrl}/validate-reset-token`, { token });
}

function resetPassword({ token, password, confirmPassword }) {
    return fetchWrapper.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(user => {
            // update stored user if the logged in user updated their own record
            if (user.id === userSubject.value.id) {
                // publish updated user to subscribers
                user = { ...userSubject.value, ...user };
				
				// Note: Store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                userSubject.next(user);
            }
            return user;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (id === userSubject.value.id) {
                logout();
            }
            return x;
        });
}
