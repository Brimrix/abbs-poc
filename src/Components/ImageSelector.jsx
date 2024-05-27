import React, { useState, useContext, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined, FileAddOutlined } from '@ant-design/icons';
import {
  message, Upload, Typography, Popover,
} from 'antd';
import '@styles/ImageUploaderStyle.css';
import exifr from 'exifr';
import { billContext } from '@/context/BillContext';

const { Paragraph } = Typography;

const imageHoverPopover = (actualImageURL, isProcess) => (
  actualImageURL && isProcess
    ? <img style={{ height: '200px', width: '160px' }} src={actualImageURL} /> : <span>Upload image</span>
);


const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(file);
};

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

function ImageSelector({ _id, reRender, renderSource }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [actualImageURL, setActualImageURL] = useState('');
  const [success, setSuccess] = useState(false);
  const [infoFile, setInfoFile] = useState();
  const [isProcess, setIsProcess] = useState(false);

  const { state, dispatch } = useContext(billContext);

  useEffect(() => {
    let flag = true;
    if (flag) {
      setActualImageURL(renderSource);
      setIsProcess(true);
    }

    return () => flag = false;
  }, [renderSource, reRender]);

  useEffect(() => {
    if (imageUrl && infoFile) {
      const imageFile = new Image();
      imageFile.src = imageUrl;
      let xResolution = 0;
      let yResolution = 0;
      let resolutionUnit = 0;

      imageFile.onload = async function () {
        try {
          const exifData = await exifr.parse(infoFile);
          xResolution = exifData.XResolution;
          yResolution = exifData.YResolution;
          resolutionUnit = exifData.ResolutionUnit;

          if (resolutionUnit && xResolution && yResolution) {
            const calculatedHeight = Math.round((this.height / yResolution) * 100) / 100;
            const calculatedWidth = Math.round((this.width / xResolution) * 100) / 100;
            const calculatedAREA = Math.round(((calculatedHeight * calculatedWidth) / 144) * 100) / 100;
            setActualImageURL(imageUrl);
          if(state.billData[_id].image_src===''){
            dispatch({
              type: "ADD_ROW",
            })
          }
           
            dispatch({

              type: 'SET_DIMENSION',
              payload: {
                name: infoFile.name,
                IMAGE_SOURCE: imageUrl,
                HEIGHT: calculatedHeight,
                WIDTH: calculatedWidth,
                area: calculatedAREA,
                AMOUNT: Math.round((calculatedAREA * state.billData[_id].actualPrice * state.billData[_id].actualQuantity) * 100) / 100,

                _key: _id,
              },
            });
            setIsProcess(true);
            message.success('Successfully uploaded');
          } else {
            message.error('Invalid Image');
          }
        } catch {
          message.error('There is an error in the image');
        }
      };

      imageFile.onerror = function () {
        console.error('Image failed to load.');
      };
    }
  }, [success]);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }

    if (info.file.status === 'done' || info.file.status === 'removed') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setSuccess((prev) => !prev);
        setInfoFile(info.file.originFileObj);
        setLoading(false);
      });
    } else if (info.file.status === 'error') {
      setLoading(false);
      message.error('Upload failed.');
    }
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const UploadButton = () => {
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>;
  };

  return (

    <Popover placement="left" content={imageHoverPopover(actualImageURL, isProcess)}>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={customRequest}
      >
        <UploadButton />
        <div style={{ color: '#0B6E4F' }} className="d-flex align-items-center justify-content-between">
          <FileAddOutlined />
          <Typography.Text>Select File</Typography.Text>
        </div>
      </Upload>
    </Popover>
  );
}

export default ImageSelector;
