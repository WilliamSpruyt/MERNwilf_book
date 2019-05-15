import React from "react";
import logo from "../Assets/logo.svg"
import profile from "../Assets/profile.JPG"
import {Me} from "./me"
import{WhatsOnYourMind} from "../Components/whatsonyourmind"
import {Post} from "../Components/post"
import{Friend} from "../Components/friend"
import{FindFriends} from"../Components/find-frends"
import './login.css';

import { FormControl, Row, Container, Col } from "react-bootstrap";
export class Homescreen extends React.Component {
  render() {
    return (
     
        <div style={{textAlign:'center'}}>
         
            <img src={logo} width="100%" />
            <div  >
                <Me alias={this.props.alias} pic={profile} p/>
               
          </div>
         
          <Row  >
    <Col xs lg="2"  >
    <p1>Find Friends</p1>
     <FindFriends  findFriend={this.props.findFriend}/>
     
             {this.props.otherPeople.name && <Friend addFriend={this.props.addFriend} pals={false}
              friend={this.props.otherPeople}
               />}
           
    </Col>
    <Col md="auto"   className="align-content-md-left"> 
     <WhatsOnYourMind id ={this.props.id} alias={this.props.alias} updateDB={this.props.updateDB} updatePost={this.props.updatePost} blah=""/>
    {this.props.posts && this.props.posts.map((ele, i) => {
            return (
              <Post 
              alias={ele.alias}
              date={ele.date}
              caption={ele.caption}
               pic={ele.pic}
                
              
                
              />
            );
          })}</Col>
    <Col xs lg="4"   className="align-content-md-left" >
    <p1>Friends</p1>
    {this.props.friends.map((ele, i) => {
            return (
              <Friend addFriend={this.props.addFriend}
              friend={ele}
              pals={true}
               />
            );
          })}
    </Col>
  </Row>
         </div>
    );
  }
  
}