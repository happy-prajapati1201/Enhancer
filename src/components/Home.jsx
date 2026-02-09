import React, { useState } from 'react'
import Imageupload from "./imageupload"
import Imagepreview from "./Imagepreview"
import { enhancedImageAPI } from '../utils/enhanceimageAPI'

const Home = () => {
    const [UploadImage,setUploadImage]=useState(null);
    const [enhancedImage,setEnhancedImage]=useState(null);
    const [loading,setLoading]=useState(false);

const uploadImagehandler = async(file) => {
  setUploadImage(URL.createObjectURL(file));
  setLoading(true);

  try {

    const enhancedURL = await enhancedImageAPI(file)
    setEnhancedImage(enhancedURL);
    setLoading(false);
    // code with may produce error
  }catch (error){
    // code to handle the error and show message
    console.log(error)
    alert("error")
  }

};

  return (
    <>
      <Imageupload  uploadImagehandler={uploadImagehandler} />
      <Imagepreview 
      loading={loading} 
      uploaded={UploadImage}
      enhanced={enhancedImage?.image}/>
    </>
  )
}

export default Home
