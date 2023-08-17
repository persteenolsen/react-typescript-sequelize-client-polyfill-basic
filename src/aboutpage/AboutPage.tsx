import React from "react";
import ReactDOM from "react-dom";

// TEST
// Remove the HTML tags and the statement will not pass TypeScript types checking 
// Use the valid HTML tags and the statement will pass TypeScript types checking  

import { FC } from 'react'
const Hello: FC = () => <p><span style={{color: "green"}}>Hello World :-) <b> - React with TypeScript</b> served at the {new Date().toLocaleDateString()}</span></p>

interface IProps {
}

class AboutPage extends React.Component <IProps> {
    constructor( props: IProps ) {
        super(props);

        this.state = {
                   
        };
    }

    componentDidMount() {
     
    }

    render() {

        return (
         
		   <div className="container">
                        
			<div className="row">
                            
			 <div className="col-xs-auto col-md-auto" >
			 					                     
			  <br/> 
			  
			  <Hello />
			  
			  <h3>Description</h3>
           
               This React and TypeScript SPA Client work together with a secure Node.js Express Web API using Sequelize ORM and JWT access tokens serving as a Role based Membership System. Some older Browsers like IE 11 are mostly supported
			   <br/><br/>

			   <b>Last updated</b>
			   <ul>
				  <li>17-08-2023</li>
			   </ul>

			   <b>GitHub</b>
			   <ul>
			     <li><a href="https://github.com/persteenolsen/react-typescript-sequelize-users-client-polyfill-basic" target="_blank">The React TypeScript SPA Client - The frontend</a></li>
				 <li><a href="https://github.com/persteenolsen/node-express-sequelize-users-api-basic" target="_blank">The Web API - The backend</a></li>
			   </ul>
              	
             
			   <b>Main functionality of Users</b>
			   <ul>
			   <li>Upgraded from Node 12.16 to Node 14.17</li>
			    <li>Users are able to register an account and after verify the email, the users will be able to login to the system</li>
			    <li>After a successfully login the users can update own profiles</li>
			    <li>The users can receive new passwords by the forgot password functionality by reseting their password before a given time like 24 hours</li>
			   </ul>
			  
			   <b>Main functionality of Administrators</b>
			   <ul>
			    <li>Administrators have access to the same functionality as the users</li>
			    <li>In addition Administrators are able to list, create, update and delete the users</li>
			   </ul>
			
               <b>Technology used for implementing authentication and security</b>        
               <ul>
             	 <li>The Passwords of the users and administrators are encrypted by BCRYPT before stored in the database</li>
                 <li>The system is using a JSON Web Token ( JWT ) for access to the secure endpoints of the Web API after a successfully authentication</li>
				 <li>Authentication is implemented JWT access tokens ( expires after 15 minutes for testing ). Then the User will need to log in again</li> 
				 <li>The User is able to stay logged if / when using Refresh the page by the Browser. The localStorage is used as well by this React client for making more logic!</li>
				<li>The Web API is secured by CORS allowing only the subdomain containing the React SPA client making HTTPS request</li>
				 <li>Frontend validation</li>
				 <li>Joi Schema for backend validation to controle form input by removing whitespaces, 
					 allowing only limited length of input, letters and numbers only ...</li>
                 <li>The above security is making the Web API and the data secure for the users of the system</li>
               </ul> 
          

               <b>Technology and hosting used for the React SPA client - The frontend</b>  
               <ul>
				<li>The frontend are representing the V for Views due to the MVC pattern</li>
				<li>Surport for most used Browsers and the "good old" IE 11</li>
                <li>React, HTML and CSS</li>
				<li>TypeScript with React in .tsx files</li>
				<li>JavaScript with React in .jsx files</li>
				<li>Mainly JavaScript ES5, ES6 and ES7 but in some cases up to ES10</li>
				<li>Formik and Yup for frontend form input validation</li>
                <li>Traditionel Bootstrap 4 by CDN for the responsive design</li>
	            <li>Manuel configuration of the Webpack 4 serving as a module bundler</li>
			    <li>Babel for transpiling JavaScript React ES6 to JavaScript ES5 ready for browsers</li>
			    <li>React BrowserRouter for navigation</li>
                <li>Hosted at a traditional Webhotel as a ES5 bundle and a index.html loading the Bootstrap by CDN</li>
              </ul>
          
		      <b>Technology, structure and hosting used for the Node.js Web API - The backend</b>  
              <ul>
               <li>Node.js and Express are used for the Web API backend</li>
			   <li>Sequelize ORM for mapping Models towards Database tables</li>
			   <li>Nodemailer for sending emails according to verify email and forgot password</li>
			   <li>Validation is implmented by using the Sequelize ORM functionality as well as other validation logic</li>
		       <li>Mainly JavaScript ES5, ES6 and ES7 but in some cases up to ES10</li>
			   <li>Models / Classes are used for a better overview and more clear syntax of the code</li>
			   <li>The MVC pattern is implemented by file structure representing a Model, Controllers and Services</li>
			   <li>The Views of the MVC pattern are represented by the React frontend</li>
			   <li>Hosted as a Cloud Service at Micosoft Azure App Service on a free service plan using Windows and iisnode</li>
              </ul>
          
		      <b>Documentation of the API</b>  
		     <ul>
		       <li>Swagger</li>
		     </ul>
			 
		     <b>Type of database</b>  
		     <ul>
		       <li>MySQL</li>
		     </ul>
			         
		     <b>Texteditor</b>  
		     <ul>
              <li>Visual Studio Code</li>
             </ul>

			 <b>Versions for the development stack of the Membership system</b>  
		     <ul>
              <li>React 16.8.6 for the frontend client</li>
			  <li>Bootstrap 4.4.1 for the responsive design of the frontend delivered by CDN</li>
			  <li>Node.js 8.9.4 and Express 4.16.3 for the backend Web API</li>
			  <li>Webpack 4.29.6 for the module bundler</li>
			  <li>MySQL 5.7 as database</li>
             </ul>
             			 		   
			   			   
			 <b>Testing</b>  
		       <ul>
		        <li>Test Driven Developement and Unit Testing all the way developing the system</li>
		       </ul>

           </div>

	      </div>
		
		</div>
	   
	   
      );

    }
}

export { AboutPage };