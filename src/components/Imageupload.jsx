import React from 'react'

const imageupload = (props) => {

    const showImagehandler = (e) => {
        const file = e.target.files[0];
        if(file){
            props.uploadImagehandler(file);
        }
        
    }

  return (
    <div className='bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl'>
      <label htmlFor='fileInput' className='block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-300 transition-all'>
        <input type='file' id='fileInput' className='hidden' onChange={showImagehandler}/>
        <span className='text-lg font-medium text-gray-600'>Click and deag to upload your image</span>
      </label>
    </div>
  )
}

export default imageupload
