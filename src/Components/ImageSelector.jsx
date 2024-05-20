import React, { useState, useContext, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload, Typography, Popover } from 'antd';
import { imageContext } from '@/context/ImageContext';
import exifr from 'exifr';


import '@styles/ImageUploaderStyle.css';
import {
   FileAddOutlined
} from '@ant-design/icons';


const hoverImage = (imageSrc) => (

  <>
  {imageSrc ?  <img style={{height: "200px", width: "150px"}} src={imageSrc}/> : <span>Upload image!</span>}
   

  </>
);

const {Paragraph} = Typography;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

// I have now rowIndex and Name of the image file coming

function getImageInfoFromBase64(base64Data, setDimensions, imageInfo, rowIndex, setImageData, prevImageArray) {
    const image = new Image();
    image.src = base64Data;

    image.onload = async function() {

      let Image_width = this.width;
      let Image_height = this.height;
      let image_name = imageInfo.name;
      let xResolution;
      let yResolution;
      let resolutionUnit;

      try{
        const exifData = await exifr.parse(imageInfo);
        xResolution = exifData.XResolution;
        yResolution = exifData.YResolution;
        resolutionUnit = exifData.ResolutionUnit;
      }
      catch{
        console.log("There is an error in the xResolution & yResolution Computation");
      }

      console.log(typeof xResolution, typeof yResolution, typeof resolutionUnit===undefined);
      if(xResolution===undefined || yResolution===undefined || resolutionUnit===false){
        xResolution = 1;
        yResolution = 1;
        resolutionUnit = '';
        Image_height = 0;
        Image_width = 0;

      }

      // Context API

      setImageData([...prevImageArray, {imageSrc: base64Data, rowIndex}]);

      setDimensions({Image_width, Image_height, image_name, rowIndex, yResolution, xResolution, resolutionUnit});



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



const ImageSelector = ({setDimensions, rowIndex}) => {


  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [imageActualSrc, setImageActualSrc] = useState();

  const {imageData, setImageData} = useContext(imageContext);


  useEffect(()=> {
    imageData.forEach(element => {
      if(element.rowIndex===rowIndex){
        setImageActualSrc(element.imageSrc);
      }
    });
  }, [])

  const handleChange = (info) => {



    if (info.file.status) {

      setLoading(true);

        getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);

        getImageInfoFromBase64(imageUrl, setDimensions, info.file.originFileObj, rowIndex, setImageData, imageData);






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
    <>

      <Popover placement="left" content={hoverImage(imageActualSrc)}>
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
      </Popover>
    </>


  );
};
export default ImageSelector;