import React from "react";
import logo from "../Assets/logo.svg"
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

 
 

 
export class Inbox extends React.Component {
  render() {
      return(
          <div>
              {this.props.messages && this.props.messages.map( ele=>{return  (
        <Card bg="dark" style={{ width: '100%' , textAlign: 'left'}}>
        <Card.Img variant="bottom" src={this.props.pic} />
        <Card.Body>
          <Card.Title>{ele.text}</Card.Title>
          <Card.Text>
          {ele.sender}  
        
         
          </Card.Text>
          <Card.Text>
           
          {ele.time}
         
          </Card.Text>
          <Button style={{ width: '2rem' }}> <FontAwesomeIcon icon={faThumbsUp}  /></Button>
        </Card.Body>
      </Card>
      );
              })}
          </div>
      )
      
     
  
}
}