import React from "react";
import logo from "../Assets/logo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'
import profile from "../Assets/profile.JPG"
import "./login.css"
import { MessageBox } from './message-box';

import { Jumbotron, Container, Row, Col, Button, Card } from "react-bootstrap";
export class Friend extends React.Component {
  render() {
    return (
      <div >

        {this.props.friend &&

          <Card bg="dark" style={{ width: '100%', textAlign: 'left' }}>
            <Card.Img variant="bottom" src={this.props.friend.profilePic} className="profile-pics" />
            <Card.Body>
              <Card.Title>{this.props.friend.name}</Card.Title>
              <Card.Text>
                {this.props.friend.homeTown}
                {this.props.date}

              </Card.Text>
              <Button className="butz2" onClick={() => { this.props.addFriend(this.props.friend, this.props.pals) }
              }>
                {(this.props.pals) ? <FontAwesomeIcon icon={faUserSlash} /> : <FontAwesomeIcon icon={faUserPlus} />}

              </Button>
            </Card.Body>
            {this.props.pals && <MessageBox id={this.props.friend._id} sendMessage={this.props.sendMessage} alias={this.props.alias} friendsName={this.props.friend.name}/>}
          </Card>
        }</div>

    );
  }

}