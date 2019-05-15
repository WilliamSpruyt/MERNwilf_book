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
const url = "http://localhost:3001";

//const url = "/message";

// Get a reference to the database service

class App extends Component {

  constructor(props) {
    var d = new Date();
    super(props);
    this.state = {
      id: -1,
      user: "Wilf",
      email: '',
      loginshow: true,
      message: [],
      list: [],
      date: [],
      posts: [],
      friends: [],


      otherPeople: [],

      comps: complimentaries(),


    };
    this.loadStatsFromServer = this.loadStatsFromServer.bind(this);

    this.updatePost = this.updatePost.bind(this);
    this.updateDB = this.updateDB.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.getName = this.getName.bind(this);
    this.setShow = this.setShow.bind(this);
    this.logout = this.logout.bind(this);
    this.findFriend=this.findFriend.bind(this);
    this.addFriend=this.addFriend.bind(this);

  }
  componentDidMount() {

    window.scrollTo(0, 0)

  }
  loadStatsFromServer = (id) => {


    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch(`${url}/${id}`)
      .then(data => data.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error }, console.log('oh shit it has not worked ' + this.state.error));
        else
          this.setState({ name: res.act[0].name, id: res.act[0]._id, posts: res.act[0].posts, friends: res.act[0].friends, email: res.act[0].email,pic:res.act[0].pic }, () => {

          });
      });
  };

  updateDB() {




    var posts = this.state.posts;
    var friends = this.state.friends;
    var id = this.state.id;

    return fetch(`${url}/update/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        posts,
        friends,
         
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(posts, friends, "UPDATED:", res.message);
        this.loadStatsFromServer(this.state.email);
        return res;
      })

      .catch(err => console.error(err));
  }


addFriend(friend,isFriend){
  if(!isFriend){
  if (this.state.friends) {
    var oldFriends = this.state.friends.slice(0);



    oldFriends.unshift({ name:friend.name,homeTown:friend.homeTown,id:friend.id });
    
    this.setState({ friends: oldFriends }, () => { this.updateDB() });
  }
  else this.setState({ friends: [{ name:friend.name,homeTown:friend.homeTown,id:friend.id }] }, () => { this.updateDB() });}
  else{
    var oldFriends = this.state.friends.slice(0);
   var newFriends=oldFriends.filter(ele=>ele.id!=friend.id);
   
   this.setState({ friends: newFriends,otherPeople:{} }, () => { this.updateDB() });
   
  }
}



  updatePost(a, d, c, p) {
    if (this.state.posts) {
      var oldPosts = this.state.posts.slice(0);



      oldPosts.unshift({ alias: a, date: d, caption: c, pic: p });

      this.setState({ posts: oldPosts }, () => { this.updateDB() });
    }
    else this.setState({ posts: [{ alias: a, date: d, caption: c, pic: p }] }, () => { this.updateDB() });

  }

  findFriend = (term) => {


    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch(`${url}/friends/${term}`)
      .then(data => data.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error }, console.log('oh shit it has not worked ' + this.state.error));
        else
          this.setState({ otherPeople: { name: res.act[0].name, id: res.act[0]._id ,homeTown:res.act[0].homeTown} }, () => {

       console.log(this.state.otherPeople)   });
      });
  };


  onLogin(name) {
    this.setState({ loginshow: false, user: name });

  }
  handleLogin(event) {
    this.setState({ user: event.target.value });
  }
  changeHandler1(event) {
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
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
      // fetch("http://localhost:3001/account/logout?token=" + token)
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
          handleName={this.handleLogin}
          setShow={this.setShow}
          title="Welcome to WilfBook! Sign in or register"
          loadStatsFromServer={this.loadStatsFromServer}
        />

        {!this.state.loginshow && <Homescreen piv={this.state.pic} findFriend={this.findFriend} id={this.state.id} alias={this.state.name} otherPeople={this.state.otherPeople} friends={this.state.friends} posts={this.state.posts} updateDB={this.updateDB} updatePost={this.updatePost} addFriend={this.addFriend} />}



        <h3 style={{ marginTop: "10vh", textAlign: "right", padding: "5%" }}>
          Logged in as {this.state.name}
          <Button
            onClick={() => {
              this.setState({ loginshow: true });
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
  var red1 = Math.floor(Math.random() * 256);
  var red2 = Math.floor(Math.random() * 256);
  var red3 = 256 - red1 - red2;
  var blu1 = Math.floor(Math.random() * 256);
  var blu2 = Math.floor(Math.random() * 256);
  var blu3 = 256 - blu1 - blu2;
  var gre1 = Math.floor(Math.random() * 256);
  var gre2 = Math.floor(Math.random() * 256);
  var gre3 = 256 - gre1 - gre2;

  return {
    red: [red1, red2, red3],
    blue: [blu1, blu2, blu3],
    green: [gre1, gre2, gre3]
  };
}

export default App;



