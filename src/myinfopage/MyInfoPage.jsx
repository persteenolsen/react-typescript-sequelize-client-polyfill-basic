import React from 'react';

// Import of an asset usin alias in Webpack
import LOGO from 'images/persteenolsen.jpg';

class MyInfoPage extends React.Component {
   

    componentDidMount() {
     
    }

    render() {
      
        return (
         
		 
		  <div className="p-4">
            <div className="container">
			
					
		   <h2>Per Steen Olsen</h2><br />
		   
		   <h4>Web Developer</h4><br />
			
           <img width="150px" src={LOGO} alt="Per Steen Olsen" />
		   
		   <br/>

           </div>
         </div>

	   
      );

    }
}

export { MyInfoPage };