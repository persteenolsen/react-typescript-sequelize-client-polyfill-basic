import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';

function Nav() {
    const [user, setUser] = useState({});

    useEffect(() => {
        
		// Note: Unsubscribe ( to avoid memoryleaks ) needs to be without return because using
		// return will cause a "minor" error in the Chrome console
		const subscription = accountService.user.subscribe(x => setUser(x));
		subscription.unsubscribe;
		
		// return subscription.unsubscribe;
       }, []);

    // Admin Nav only show when logged in
    if (!user) {
	  return (
	            
	          <div>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                         						 
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"></span>
                    </button>
						
                     <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
	  	  
	                 <div className="navbar-nav">
                   
                       <NavLink to="/about" className="nav-item nav-link">About this Application</NavLink>
					   <NavLink to="/persteenolsen" className="nav-item nav-link">Per Steen Olsen</NavLink>
					   <NavLink to="/account/forgot-password" className="nav-item nav-link">Forgot Password</NavLink>
					   <NavLink to="/account/register" className="nav-item nav-link">Register</NavLink>
					   <NavLink to="/account/login" className="nav-item nav-link">Login</NavLink>
                 
                  </div>
				</div>
				
            </nav>
          </div>
    );
	}
    else {
       return (
        <div>
		      
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                         						 
                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                 </button>
						
                 <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
	  	                  
				   <div className="navbar-nav">
				  
                     <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                     <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>
                     
					 {user.role === Role.Admin &&
                        <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                     }
                     <a onClick={accountService.logout} className="nav-item nav-link">Logout</a>
                 
				   </div>
				 
				 </div>
				
            </nav>
			
            <Route path="/admin" component={AdminNav} />
			
        </div>
    );
	
  }
}

function AdminNav({ match }) {
    const { path } = match;

    return (
        <nav className="admin-nav navbar navbar-expand navbar-light">
            <div className="navbar-nav">
                <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
            </div>
        </nav>
    );
}

export { Nav }; 