import React from "react";
import{Friend} from "../Components/friend"

import { FormControl } from "react-bootstrap";
export class FindFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
          blah:"",
          
          
        };
        
        this.onTextboxChange = this.onTextboxChange.bind(this);
        this.onTextboxBlur = this.onTextboxBlur.bind(this);
    
    }
    onTextboxChange(event){
        this.setState({
          blah: event.target.value
        }, this.props.findFriend( event.target.value))
   }
   onTextboxBlur(){
    this.setState({
      blah: ""
    })
}
        render() {
            ;
            return (
             
                <div float="left" >
                    
                    <FormControl 
                  
                    type="text"
                    placeholder="Find friends"
                    value={this.state.blah}
                    onChange={this.onTextboxChange}
                    onBlur={this.onTextboxBlur}
                    
                   
                     
                  /> <div >
                  {this.props.otherPeople.name && <Friend  addFriend={this.props.addFriend} pals={false}
                    friend={this.props.otherPeople}
                     />}</div>
            
                  </div>
                   
                 
            );
          }
          
        }
    
