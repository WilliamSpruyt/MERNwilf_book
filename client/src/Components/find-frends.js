import React from "react";
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera,faFileImage} from '@fortawesome/free-solid-svg-icons'

import { FormControl, Row, Container, Col,Button,Card } from "react-bootstrap";
export class FindFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
          blah:"",
          
          
        };
        
        this.onTextboxChange = this.onTextboxChange.bind(this);
    
    }
    onTextboxChange(event){
        this.setState({
          blah: event.target.value
        }, this.props.findFriend( event.target.value))
   }
        render() {
            ;
            return (
             
                <div float="left">
                    
                  <Row><Col  xs lg="2">
                    
                    
                   </Col>
                 <Col> <FormControl 
                  
                    type="text"
                    placeholder="Find friends"
                    value={this.state.blah}
                    onChange={this.onTextboxChange}
                    
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                      }}}
                  /></Col> 
                 </Row>
                  </div>
                   
                 
            );
          }
          
        }
    
