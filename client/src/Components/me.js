import React from "react";
 
import "./login.css";
 
 

 
export class Me extends React.Component {
  render() {
    return (
     
        <div>
            
            <img src={this.props.pic } alt={this.props.alias} className="profile-pics" />
           <div>Signed in as {this.props.alias}</div>
           
         </div>
    );
  }
  
}