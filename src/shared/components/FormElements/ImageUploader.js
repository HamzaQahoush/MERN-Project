import React, { useRef } from 'react';
import Button from './Button';
import './ImageUpload.css'
function ImageUploader(props) {
    const pickedHandler =(e)=>{
        console.log(e.target);
    }
  const filePickerRef = useRef();
  const pickImageHandler = () => {
    filePickerRef.current.click()
  };
  return (
    <div className="form-control">
      <input
        type="file"
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      ></input>
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          <img src="" alt="preview"></img>
        </div>
        <Button type="button" onClick={pickImageHandler}>Pick an Image</Button> 
      </div>
    </div>
  );
}

export default ImageUploader;
