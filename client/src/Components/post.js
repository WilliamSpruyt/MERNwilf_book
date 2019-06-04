import React from "react";

import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

export class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }
  render() {
    return (
      <Card bg="dark" style={{ width: "100%", textAlign: "left" }}>
        <Card.Img variant="bottom" src={this.props.pic} />
        <Card.Body>
          <Card.Title>{this.props.caption}</Card.Title>
          <Card.Text>
            {this.props.alias == this.props.user
              ? "Yourself "
              : this.props.alias + "  "}
            {this.props.date}
          </Card.Text>
          {this.props.user !== this.props.alias && (
            <Button
              onClick={() => {
                this.props.like(
                  this.props.user,
                  this.props.alias,
                  this.props.timestamp
                );
                this.setState({ clicked: !this.state.clicked });
              }}
            >
              {this.state.clicked ? (
                <FontAwesomeIcon icon={faThumbsDown} />
              ) : (
                <FontAwesomeIcon icon={faThumbsUp} />
              )}
            </Button>
          )}
          {this.props.likedBy.length > 0 && (
            <Card.Text>
              {this.props.likedBy.length + " "}
              {this.props.likedBy.map((ele,i) => {
                return <span key={i} className="tinyGreyScript">{ele + ","}</span>;
              })}
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    );
  }
}
