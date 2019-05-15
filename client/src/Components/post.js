import React from "react";
import logo from "../Assets/logo.svg"
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

 
 

 
export class Post extends React.Component {
  render() {
    return (
      <Card style={{ width: '36rem' , textAlign: 'left'}}>
      <Card.Img variant="bottom" src={this.props.pic} />
      <Card.Body>
        <Card.Title>{this.props.caption}</Card.Title>
        <Card.Text>
        {this.props.alias+"  "}  
        {this.props.date}
       
        </Card.Text>
        <Button style={{ width: '2rem' }}> <FontAwesomeIcon icon={faThumbsUp}  /></Button>
      </Card.Body>
    </Card>
    );
  }
  
}
 