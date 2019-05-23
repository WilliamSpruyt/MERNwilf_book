import React from "react";
 
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import './login.css';
import { FormControl, Row, Container, Col,Button,Card, Form } from "react-bootstrap";

export class MessageBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         
        blah:"",
        pic:null,
        
        
      };
      
      this.onTextboxChange = this.onTextboxChange.bind(
        this
      );}
      
     
       
    render() {
      const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
      return (
       
           <FormControl 
            
              type="text"
              placeholder={"Message "+this.props.friendsName}
              value={this.state.blah}
              onChange={this.onTextboxChange}
              
              onKeyPress={event => {
                if (event.key === 'Enter') {
                var d=new Date();
                this.props.sendMessage(this.props.alias,this.props.id,d.toString(),this.state.blah,
                this.state.pic,d.getTime());this.setState({blah:"",pic:null})}}}
            /> 
             
           
      );
    }
    onTextboxChange(event) {
      this.setState({
        blah: event.target.value
      });
    }
  
     
  }