import React from "react";
 
 
 
import './login.css';
import { FormControl} from "react-bootstrap";

export class MessageBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         
        blah:"",
        
        
        
      };
      
      this.onTextboxChange = this.onTextboxChange.bind(
        this
      );}
      
     
       
    render() {
       
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
                this.props.pic,d.getTime());this.setState({blah:""})}}}
            /> 
             
           
      );
    }
    onTextboxChange(event) {
      this.setState({
        blah: event.target.value
      });
    }
  
     
  }