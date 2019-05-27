import React from "react";
import logo from "../Assets/logo.svg"
 
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
            <div  >
                      <Me alias={this.props.alias} pic={this.props.profilePic} p/>
                     
                </div >
         
          <Row   ><Col style={{padding: '0'}}  >
         
                <div style={{padding:'25px' }}>
                {this.props.friends.length? <h3>Friends</h3>: <h3>Friendless!</h3>}
          {this.props.friends.map((ele, i) => {
                  return (
                    <Friend addFriend={this.props.addFriend}
                    friend={ele}
                    alias={this.props.alias}
                    email={this.props.email}
                    pic={this.props.profilePic}
                    pals={true}
                    sendMessage={this.props.sendMessage}
                     />
                  );
                })}
                </div>
          
                 
          </Col>
    
    <Col l={6} md={6}  xs={12} div style={{padding:'25px' }} > 
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
          })}</Col><Col  style={{padding:'25px' }} >
          
          <h3>Find Friends</h3>

           <FindFriends  findFriend={this.props.findFriend} otherPeople={this.props.otherPeople}  addFriend={this.props.addFriend} pals={false}/>
           
                   
            <Inbox messages={this.props.messages}  />
                 
          </Col>
     
  </Row>
         </div>
    );
  }
  
}