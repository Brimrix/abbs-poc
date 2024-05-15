import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload, Typography } from 'antd';
import './ImageUploaderStyle.css'
import {
   FileAddOutlined 
} from '@ant-design/icons';
const {Paragraph} = Typography;
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

// I have now rowIndex and Name of the image file coming

function getImageInfoFromBase64(base64Data, setDimensions, imageInfo, rowIndex) {
    const image = new Image();
    image.src = base64Data;

    image.onload = function() {

      const Image_width = this.width;
      const Image_height = this.height;
      const image_name = imageInfo.name;
   

      setDimensions({Image_width, Image_height, image_name, rowIndex});
    
      

    };
  }



const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

// Get the props from the table component to set the row dimensions for the table  provided by the user
// SetDimensions is a function which will update the state of dimensions object so that the row entry is updated after 
// obtaining the height and width of the image.

const ImageSelector = ({setDimensions, rowIndex}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();


  const handleChange = (info) => {

    
    if (info.file.status) {

      setLoading(true);

        getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        
        getImageInfoFromBase64(imageUrl, setDimensions, info.file.originFileObj, rowIndex);
      
      });
      return;


    }

  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
      <Upload
        
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
      
        <div style={{color: '#0B6E4F'}} className='d-flex align-items-center justify-content-between'>
         

      <FileAddOutlined  />
      <Typography.Text>Select File</Typography.Text> 


        </div>
      
      </Upload>
    
  );
};
export default ImageSelector;