import React, { Component } from "react";
import soHappy from "./Assets/meeee.png"
import yourFriend from "./Assets/friend.png"
import onTopOfTheWorldToday from "./Assets/onTopOfTheWorldToday.jpg"

import "./App.css";
import { Homescreen } from "./Components/homescreen"
import "whatwg-fetch";

import { Button } from "react-bootstrap";
import { getFromStorage } from "./utils/storage";
import VerifiedLogin from "./Components/verified"
//const url = "http://localhost:3001";

const url = "";

// Get a reference to the database service

class App extends Component {

  constructor(props) {
    var d = new Date();
    super(props);
    this.state = {
      id: -1,
      user: "",
      email: '',
      loginshow: true,
      message: [],
      list: [],
      date: [],
      posts: [],
      friends: [],
      profilePic: yourFriend,
      messages: [{ text: "howdy cowby", sender: "Stalker", time: "MidNight" }],
      otherPeople: [],
      freshFriends:[],

      comps: complimentaries(),


    };
    this.loadStatsFromServer = this.loadStatsFromServer.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.updateProfilePic = this.updateProfilePic.bind(this);
    this.mergePost = this.mergePost.bind(this)
    this.updateDB = this.updateDB.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getName = this.getName.bind(this);
    this.setShow = this.setShow.bind(this);
    this.logout = this.logout.bind(this);
    this.findFriend = this.findFriend.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.like=this.like.bind(this);

  }
  componentDidMount() {
    console.log(this.state.comps)
    window.scrollTo(0, 0)


  }
  loadStatsFromServer = (id) => {


    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch(`${url}/${id}`)
      .then(data => data.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else {
          this.setState({ name: res.user[0].name, id: res.user[0]._id, posts: res.user[0].posts, friends: res.user[0].friends, email: res.user[0].email, profilePic: res.user[0].profilePic, messages: res.user[0].messages }, () => {
              this.state.friends.forEach((ele)=>this.findFriendByEmail(ele.email))
            
          });
        }
        this.setState({friends:this.state.freshFriends})
      })
  }
  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }
  mergePost(posts, friends) {
    var merged = posts.slice(0);
    if (friends.length > 0) {
      friends.forEach(friend => merged = merged.concat(friend.posts))

      merged = this.sortByKey(merged, "timestamp");
      
    }
    return merged
  }

  
  updateDB() {
    var posts = this.state.posts;
    var friends = this.state.friends;
    var id = this.state.id;
    var profilePic = this.state.profilePic;

    return fetch(`${url}/update/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        posts,
        friends,
        profilePic

      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("UPDATED:");
       // this.loadStatsFromServer(this.state.email);
         
        return res;
      })

      .catch(err => console.error(err));
  }


  addFriend(friend, isFriend) {
    if (!isFriend) {
      if (this.state.friends) {
        var oldFriends = this.state.friends.slice(0).concat(friend);

        this.setState({ friends: oldFriends, otherPeople: [] }, () => { this.updateDB() });
      }
      else this.setState({ friends: [friend], otherPeople: [] }, () => { this.updateDB() });
    }
    else {
      var oldFriends = this.state.friends.slice(0);
      var newFriends = oldFriends.filter(ele => ele._id != friend._id);

      this.setState({ friends: newFriends }, () => { this.updateDB() });

    }
  }



  updatePost(alias, dateString, caption, pic, timestamp) {
    if (this.state.posts) {
      var oldPosts = this.state.posts.slice(0).concat({ alias: alias, date: dateString, caption: caption, pic: pic, timestamp: timestamp, likedBy:[] });
  
      this.setState({ posts: oldPosts }, () => { this.updateDB() });
    }
    else this.setState({ posts: [{ alias: alias, date: dateString, caption: caption, pic: pic, timestamp: timestamp,likedBy:[] }] }, () => { this.updateDB() });

  }

  like(user,alias,timestamp,id){
    var likedAlready=-1;
    var friendArray=this.state.friends.slice(0);

    var friendIndex = friendArray.findIndex(function(element) {
      return  element.name==alias ;
     
    });
     
    var likedPostIndex=friendArray[friendIndex].posts.findIndex(function(element){
      return  element.timestamp==timestamp
    })

    if(likedPostIndex>-1){
    if(friendArray[friendIndex].posts[likedPostIndex].likedBy)  {likedAlready=friendArray[friendIndex].posts[likedPostIndex].likedBy.findIndex(
       function(element) {return element==user}
      )}
      if(likedAlready>-1){
        friendArray[friendIndex].posts[likedPostIndex].likedBy.splice(likedAlready,1)
      }
      else{
      if(friendArray[friendIndex].posts[likedPostIndex].likedBy){
        
        friendArray[friendIndex].posts[likedPostIndex].likedBy=friendArray[friendIndex].posts[likedPostIndex].likedBy.concat(user)}
      else{friendArray[friendIndex].posts[likedPostIndex].likedBy=[user]}}
   this.setState({friends:friendArray},()=>{this.sendLike(user,this.state.friends[friendIndex]._id, friendArray[friendIndex].posts[likedPostIndex]) })
  }
 
}
 


  updateProfilePic(pic) {
    this.setState({ profilePic: pic }, () => { this.updateDB() })

  }

  findFriend = (term) => {

    if (term != this.state.name) {
      // fetch returns a promise. If you are not familiar with promises, see
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
      fetch(`${url}/friends/${term}`)
        .then(data => data.json())
        .then(res => {
          if (!res.success) this.setState({ error: res.error }, console.log('oh shit it has not worked ' + this.state.error));
          else
            this.setState({ otherPeople: res.friend[0] }, () => {


            });
        });
    }
  };
  
  findFriendByEmail = (term) => {

    if (term != this.state.name) {
      // fetch returns a promise. If you are not familiar with promises, see
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
      fetch(`${url}/refresh/${term}`)
        .then(data => data.json())
        .then(res => {
          if (!res.success) this.setState({ error: res.error }, console.log('oh shit it has not worked ' + this.state.error));
          else
            var temppeople=this.state.freshFriends;
            temppeople.push(res.friend[0])
            this.setState({ freshFriends: temppeople }, () => {


            });
        });
    }
  };
  

  sendMessage(sender, id, time, text, pic) {

    var messages = { sender: sender, text: text, time: time, pic, pic };


    return fetch(`${url}/message/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages

      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("UPDATED:", res.message);

        return res;
      })

      .catch(err => console.error(err));
  }
 
  sendLike(user, id,post) {

    var user = user;
    var post =post;


    return fetch(`${url}/likes/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user,
       post

      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("UPDATED: sendlike", post.timestamp
        );

        return res;
      })

      .catch(err => console.error(err));
  }
  onLogin(name) {
    this.setState({ loginshow: false, user: name });

  }


  getName(name) {
    this.setState({ user: name });
  }
  setShow(bool) {
    this.setState({ loginshow: bool });
  }
  logout() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      //fetch("/account/logout?token=" + token)
         fetch("/account/logout?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }
  render() {
    return (
      <div className="App">
        <VerifiedLogin id='Login'
          show={this.state.loginshow}
          submit={this.onLogin}
          getName={this.getName}

          setShow={this.setShow}
          title="Welcome to WilfBook! Sign in or register"
          loadStatsFromServer={this.loadStatsFromServer}
        />

        {!this.state.loginshow && <Homescreen
          sendMessage={this.sendMessage}
          messages={this.state.messages}
          colors={this.state.comps}
          profilePic={this.state.profilePic}
          updateProfilePic={this.updateProfilePic}
          findFriend={this.findFriend}
          id={this.state.id}
          alias={this.state.name}
          like={this.like}
          otherPeople={this.state.otherPeople}
          friends={this.state.friends}
          posts={this.mergePost(this.state.posts, this.state.friends)}
          updateDB={this.updateDB}
          updatePost={this.updatePost}
          addFriend={this.addFriend} />}



        <h3 style={{ marginTop: "10vh", textAlign: "right", padding: "5%" }}>
          Logged in as {this.state.name}
          <Button
            onClick={() => {
              this.setState({
                id: -1,
                user: "",
                email: '',
                loginshow: true,
                message: [],
                list: [],
                date: [],
                posts: [],
                friends: [],
                profilePic: "",


                otherPeople: [],

                comps: complimentaries(),


              });
              this.logout();
            }}
          >
            log out
            </Button>
        </h3>{" "}
        {this.state.date}
        {this.state.message.map((ele, i) => {
          return <div key={i}>{ele}</div>;
        })}
      </div>

    );
  }
}



function complimentaries() {
  var brk1= Math.floor(Math.random() * 256);
  var brk2= Math.floor(Math.random() * brk1);



  var red1 =brk2;
  var red2 =brk1-brk2;
  var red3 = 256 - brk1
  var brk1= Math.floor(Math.random() * 256);
  var brk2= Math.floor(Math.random() * brk1);
  var gre1 =brk2;
  var gre2 =brk1-brk2;
  var gre3 = 256 - brk1
  var brk1= Math.floor(Math.random() * 256);
  var brk2= Math.floor(Math.random() * brk1);
  var blu1 =brk2;
  var blu2 =brk1-brk2;
  var blu3 = 256 - brk1
   

  return {
    background: [red1, blu1, gre1],
  
    color: [red2,blu2,gre2],
    highlight: [red3,blu3,gre3]
    
  };
}

export default App;



