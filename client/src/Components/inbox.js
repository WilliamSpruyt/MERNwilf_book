import React from "react";
import { Card } from "react-bootstrap";
 
export class Inbox extends React.Component {
  render() {
      return(
          <div>
          <h3>Inbox</h3>
              {this.props.messages && this.props.messages.map( ele=>{return  (
        <Card bg="dark" style={{ width: '100%' , textAlign: 'left'}}>
        <Card.Img variant="bottom" src={ele.pic}  className="profile-pics"/>
        <Card.Body>
          <Card.Title>{ele.sender}</Card.Title>
          <Card.Text>
          {ele.text}  
        
         
          </Card.Text>
          <Card.Text>
           
          {ele.time}
         
          </Card.Text>
           
        </Card.Body>
      </Card>
      );
              })}
          </div>
      )
      
     
  
}
}