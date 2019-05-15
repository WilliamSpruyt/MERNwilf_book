import React from "react";
import logo from "../Assets/logo.svg"
import Webcam from "react-webcam";
import ImageUploader from 'react-images-upload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera,faFileImage} from '@fortawesome/free-solid-svg-icons'

import { FormControl, Row, Container, Col,Button,Card } from "react-bootstrap";
export class WhatsOnYourMind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       
      blah:"",
      pic:null,
      uploads:[],
      camon:false,
      addPic:false
      
    };
    this.onDrop = this.onDrop.bind(this);
    this.onTextboxChange = this.onTextboxChange.bind(
      this
    );}
    setRef = webcam => {
      this.webcam = webcam;
    };
   
    capture = () => {
      const imageSrc = this.webcam.getScreenshot();
      this.setState({pic:imageSrc,camon:false})
      
    };
    onDrop(picture) {
      this.setState({
          pictures: this.state.pictures.concat(picture),
      });
  }
  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    return (
     
        <div float="left">
            {this.state.pic && <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={this.state.pic} />
       
    </Card>}
          <Row><Col  xs lg="2">
           <Button className="butz2" onClick={()=>this.setState({camon:!this.state.camon})
             }>
           <FontAwesomeIcon icon={faCamera}  />
          </Button>
           </Col>
         <Col> <FormControl 
          
            type="text"
            placeholder="What's on your mind?"
            value={this.state.blah}
            onChange={this.onTextboxChange}
            
            onKeyPress={event => {
              if (event.key === 'Enter') {
              var d=new Date();
              this.props.updatePost(this.props.alias,d.toString(),this.state.blah,
              this.state.pic);this.setState({blah:"",pic:null})}}}
          /></Col><Button className="butz2" onClick={()=>this.setState({addPic:!this.state.addPic})
        }>
      <FontAwesomeIcon icon={faFileImage}  />
     </Button> 
         </Row>
          {this.state.camon &&  <div>
            <Webcam
              audio={false}
              height={350}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={350}
              videoConstraints={videoConstraints}
            />
            <button onClick={this.capture}><FontAwesomeIcon icon={faCamera}  /></button>
          </div>}
          {this.state.addPic &&<ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={this.onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
        />}
        </div>
           
         
    );
  }
  onTextboxChange(event) {
    this.setState({
      blah: event.target.value
    });
  }
}