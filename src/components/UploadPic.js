import React, { Component } from 'react';
import './CSS/UploadPic.css';
import bookImg from "./images/upload.jpg"
export class UploadPic extends Component {
  state={
    bookImg
  }
  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        this.setState({profileImg: reader.result})
      }
    }
    reader.readAsDataURL(e.target.files[0])
  };
	render() {
    const { profileImg} = this.state
		return (
			<div>
				
					<div className="img-holder">
						<img src={bookImg} alt="" id="img" className="img" />
					</div>
					<input type="file" accept="image/*" name="image-upload" id="input" onChange={this.imageHandler} />
					<div className="label">
            <label className="image-upload" htmlFor="input">
						  Upload
					  </label>
          </div>
			</div>
		);
	}
}
export default UploadPic;