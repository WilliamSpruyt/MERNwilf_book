import React from "react";
 
import "./login.css";
 
 

import { FormControl, Row, Container, Col } from "react-bootstrap";
export class Me extends React.Component {
  render() {
    return (
     
        <div>
            
            <img src={this.props.pic } className="profile-pics" />
           <div>Signed in as {this.props.alias}</div>
           
         </div>
    );
  }
  
}