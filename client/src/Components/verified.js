import React, { Component } from "react";
import './login.css'; 
import "whatwg-fetch";
import { Modal, FormControl, Button } from "react-bootstrap";
import { setInStorage, getFromStorage } from "../utils/storage";
 
//const url = "http://localhost:3001";
const url = "";
export default class  VerifiedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      signUpName:"",
      signUpError: "",
      signInError: "",
      signInEmail: "",
      signInPassword: "",
      signUpEmail: "",
      signUpPassword: "",
      signUpHomeTown: ""
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(
      this
    );
    this.onTextboxChangeSignUpHomeTown = this.onTextboxChangeSignUpHomeTown.bind(
      this
    );
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(
      this
    );
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(
      this
    );
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
      this
    );
    this.onTextboxChangeSignUpName = this.onTextboxChangeSignUpName.bind(
      this
    );
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }
  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch(url + "/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
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
  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }
  onTextboxChangeSignUpName(event) {
    this.setState({
      signUpName: event.target.value
    });
  }

  onTextboxChangeSignUpHomeTown(event) {
    this.setState({
      signUpHomeTown: event.target.value
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }
  onSignUp() {
    // Grab state
    const { signUpEmail, signUpPassword ,signUpName,signUpHomeTown} = this.state;
    this.setState({
      isLoading: true
    });
    // Post request to backend
    fetch(url + "/accounts/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
        name: signUpName,
        homeTown: signUpHomeTown
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: "",
            signUpPassword: "",
            signUpName: "",
            signUpHomeTown:"",
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          });
        }
      });
  }
    
  onSignIn() {
    // Grab state
    const { signInEmail, signInPassword } = this.state;
    
    this.setState({
      isLoading: true
    },()=>{this.props.loadStatsFromServer(signInEmail);});

   
    // Post request to backend
    fetch(url + "/account/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage("the_main_app", { token: json.token });
          this.setState(
            {
              signInError: json.message,
              isLoading: false,
              signInPassword: "",
              signInEmail: "",
              token: json.token
            },
            () => {
              if (this.state.token) {
                this.props.setShow(false);
              }
            }
          );
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          });
        }
      });
  }
  render() {
    const {
      isLoading,
      signUpName,
      signUpHomeTown,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError
    } = this.state;
    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
    if (this.props.show) {
      return (
         <div >
        <Modal show={this.props.show}   onHide={this.close} id='login' className="custom-modal">
        
        <div>
          {signInError ? <p>{signInError}</p> : null}
          <p>Sign In</p>
          <FormControl
            type="email"
            placeholder="Email"
            value={signInEmail}
            onChange={this.onTextboxChangeSignInEmail}
          />
          <br />
          <FormControl
            type="password"
            placeholder="Password"
            value={signInPassword}
            onChange={this.onTextboxChangeSignInPassword}
          />
          <br />
          <Button className="butz2" onClick={this.onSignIn}>
            Sign In
          </Button>
        </div>
       
        
        
        <div>
          {signUpError ? <p>{signUpError}</p> : null}
          <p>Sign Up</p>
          <FormControl
            type="string"
            placeholder="Alias"
            value={signUpName}
            onChange={this.onTextboxChangeSignUpName}
          />
          <FormControl
            type="email"
            placeholder="Email"
            value={signUpEmail}
            onChange={this.onTextboxChangeSignUpEmail}
          />
           
          <FormControl
            type="string"
            placeholder="Where you live?"
            value={signUpHomeTown}
            onChange={this.onTextboxChangeSignUpHomeTown}
          />
          <br />
          <FormControl
            type="password"
            placeholder="Password"
            value={signUpPassword}
            onChange={this.onTextboxChangeSignUpPassword}
          />
          <br />
          <Button className="butz2" onClick={this.onSignUp}>
            Sign Up
          </Button>
        </div>
        <br />
        
      </Modal></div>
      );
    }
    return (
      <div>
        
      </div>
    );
  }
}