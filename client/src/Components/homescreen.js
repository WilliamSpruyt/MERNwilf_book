import React from "react";
import logo from "../Assets/logo.svg"
import profile from "../Assets/profile.JPG"
import {Me} from "./me"
import{WhatsOnYourMind} from "../Components/whatsonyourmind"
import {Post} from "../Components/post"
import{Friend} from "../Components/friend"
import{FindFriends} from"../Components/find-frends"
import{Inbox} from "./inbox";
import './login.css';

import { FormControl, Row, Container, Col } from "react-bootstrap";
export class Homescreen extends React.Component {
  render() {
    return (
     
        <div style={{textAlign:'center'}}>
         
            <img src={logo} width="100%" />
           
         
          <Row   ><Col style={{padding: '0'}}  >
          <div  >
                      <Me alias={this.props.alias} pic={this.props.profilePic} p/>
                     
                </div >
                <div style={{borderStyle: 'inset'}}>
                {this.props.friends.length? <h3>Friends</h3>: <h3>Friendless!</h3>}
          {this.props.friends.map((ele, i) => {
                  return (
                    <Friend addFriend={this.props.addFriend}
                    friend={ele}
                    alias={this.props.alias}
                    email={this.props.email}
                    pals={true}
                    sendMessage={this.props.sendMessage}
                     />
                  );
                })}
                </div>
          
                 
          </Col>
    
    <Col xs={6} style={{padding: '0'}} > 
     <WhatsOnYourMind id ={this.props.id} alias={this.props.alias} updateDB={this.props.updateDB} updatePost={this.props.updatePost} updateProfilePic={this.props.updateProfilePic} blah=""/>
     
    {this.props.posts && this.props.posts.map((ele, i) => {
            return (
              <Post 
              alias={ele.alias}
              date={ele.date}
              timestamp={ele.timestamp}
              likedBy={ele.likedBy}
              caption={ele.caption}
               pic={ele.pic}
               like={this.props.like}
              user={this.props.alias}
                
              />
            );
          })}</Col><Col  style={{padding: '0'}} >
          
           
           <FindFriends  findFriend={this.props.findFriend}/>
           
                   {this.props.otherPeople.name && <Friend  addFriend={this.props.addFriend} pals={false}
                    friend={this.props.otherPeople}
                     />}
            <Inbox messages={this.props.messages}/>
                 
          </Col>
     
  </Row>
         </div>
    );
  }
  
}