import React from "react";
import logo from "../Assets/logo.svg"
 
 
 

import { FormControl, Row, Container, Col } from "react-bootstrap";
export class Me extends React.Component {
  render() {
    return (
     
        <div>
            
            <img src={this.props.pic} style={{width:"10%", textAlign: 'left',margin:"5px",backgroundColor:"white", boxShadow:"12px 12px 2px 1px rgba(0, 0, 255, .2", borderRadius :'25%'}}/>
           <div>Signed in as {this.props.alias}</div>
           
         </div>
    );
  }
  
}