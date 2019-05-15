import React from "react";
import logo from "../Assets/logo.svg"
 
 
 

import {Jumbotron,Container, Row,Col,Button} from "react-bootstrap";
export class Friend extends React.Component {
  render() {
    return (
     <div>
   {this.props.friend &&     
  <div style={{ textAlign: 'left',margin:"5px",backgroundColor:"white", boxShadow:"12px 12px 2px 1px rgba(0, 0, 255, .2", borderRadius :'25%'}} >
         <img style={{height:'10%', width:'10%', borderRadius :'25%'}} src={this.props.pic}/> {this.props.friend.name+" "} 
            
              {this.props.friend.homeTown} <Button className="butz2" onClick={()=>{this.props.addFriend(this.props.friend,this.props.pals)}
             }>{(this.props.pals)?"Remove":"Add"}
            
          </Button> </div>}</div>
 
    );
  }
  
}