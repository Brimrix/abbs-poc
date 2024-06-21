import React, { useState, useEffect } from "react";
import {
  LoadingOutlined,
  PlusOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { message, Upload, Typography, Popover } from "antd";
import exifr from "exifr";
import { useBillContext } from "@/context/BillContext";

const imageHoverPopover = (actualImageURL, isProcess) =>
  actualImageURL && isProcess ? (
    <img className="h-[200px] w-[160px] object-cover" src={actualImageURL} />
  ) : (
    <span>Upload image</span>
  );

const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLessThanHundredMB = file.size / 1024 / 1024 < 100;
  if (!isLessThanHundredMB) {
    message.error("Image must smaller than 100MB!");
  }
  return isJpgOrPng && isLessThanHundredMB;
};

function ImageSelector({ _id, reRender, renderSource, tableId }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [actualImageURL, setActualImageURL] = useState("");
  const [success, setSuccess] = useState(false);
  const [infoFile, setInfoFile] = useState();
  const [isProcess, setIsProcess] = useState(false);

  const { state, dispatch } = useBillContext()

  useEffect(() => {
    let flag = true;
    if (flag) {
      setActualImageURL(renderSource);
      setIsProcess(true);
    }

    return () => (flag = false);
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
            const calculatedHeight =
              Math.round((this.height / yResolution) * 100) / 100;
            const calculatedWidth =
              Math.round((this.width / xResolution) * 100) / 100;
            const calculatedAREA =
              Math.round(((calculatedHeight * calculatedWidth) / 144) * 100) /
              100;
            setActualImageURL(imageUrl);

            if (state.billData[_id].image_src === "") {
              dispatch({
                type: "ADD_ROW",
                payload: {
                  tableId,
                }
              });
              dispatch({
                type: "SET_DIMENSION",
                payload: {
                  name: infoFile.name,
                  IMAGE_SOURCE: imageUrl,
                  HEIGHT: calculatedHeight,
                  WIDTH: calculatedWidth,
                  area: calculatedAREA,
                  AMOUNT:
                    Math.round(
                      calculatedAREA *
                        state.billData[_id].actualPrice *
                        state.billData[_id].actualQuantity *
                        100
                    ) / 100,

                  _key: _id,
                  tableId,
                },
              });
              setIsProcess(true);
              message.success("Successfully uploaded");
            } else {
              message.error("Invalid Image");
            }
          }
        } catch {
          message.error("There is an error in the image");
        }

        imageFile.onerror = function () {
          console.error("Image failed to load.");
        };
      };
    }
  }, [success]);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }

    if (info.file.status === "done" || info.file.status === "removed") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setSuccess((prev) => !prev);
        setInfoFile(info.file.originFileObj);
        setLoading(false);
      });
    } else if (info.file.status === "error") {
      setLoading(false);
      message.error("Upload failed.");
    }
  };

  const customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const UploadButton = () => {
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mt-8">Upload</div>
    </div>;
  };

  return (
    <Popover
      placement="left"
      content={imageHoverPopover(actualImageURL, isProcess)}
    >
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader invoice-upload"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={customRequest}
      >
        <UploadButton />
        <div

          className="flex items-center justify-between !text-primary"
          >
          <FileAddOutlined />
          <Typography.Text>Select File</Typography.Text>
        </div>
      </Upload>
    </Popover>
  );
}

export default ImageSelector;
