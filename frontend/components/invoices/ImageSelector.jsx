import { useState, useEffect } from "react";
import {
  FileAddOutlined,
} from "@ant-design/icons";
import { message, Upload, Popover, Button, Descriptions } from "antd";
import { useBillContext } from "@/context/BillContext";
import exifr from "exifr";

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

function ImageSelector({ id, renderSource, tableId = null }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState();

  const [success, setSuccess] = useState(false);
  const [isProcess, setIsProcess] = useState(false);

  const { state, dispatch } = useBillContext()

  useEffect(() => {
    let flag = true;
    if (flag) {
      setImageUrl(renderSource);
      setIsProcess(true);
    }

    return () => (flag = false);
  }, [renderSource]);

  useEffect(() => {
    if (imageUrl && selectedFile) {
      const imageFile = new Image();
      imageFile.src = imageUrl;
      let xResolution = 0;
      let yResolution = 0;
      let resolutionUnit = 0;

      imageFile.onload = async function () {
        try {
          const exifData = await exifr.parse(selectedFile);
          xResolution = exifData.XResolution;
          yResolution = exifData.YResolution;
          resolutionUnit = exifData.ResolutionUnit;

          if (resolutionUnit && xResolution && yResolution) {
            const calculatedHeight =
              Math.round((this.height / yResolution) * 100) / 100;
            const calculatedWidth =
              Math.round((this.width / xResolution) * 100) / 100;

            {
              dispatch({
                type: "addItem",
                payload: {
                  tableId,
                }
              });
              dispatch({
                type: "setImageData",
                payload: {
                  description: selectedFile.name.split('.')[0],
                  image_src: imageUrl,
                  height: calculatedHeight,
                  width: calculatedWidth,
                  key: id,
                  tableId,
                },
              });
              setIsProcess(true);
              message.success("Successfully uploaded");
            }
          }
        } catch (exc) {
          message.error("There is an error in the image");
        }

        imageFile.onerror = function () {
          console.error("Image failed to load.");
        };
      };
    }
  }, [success]);

  const handleChange = ({ file }) => {
    if (file.status === "done") {
      getBase64(file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setSelectedFile(file.originFileObj);
        setSuccess((prev) => !prev);
      });
    } else if (file.status === "removed") {
      // TODO: Fix this, icon shows the file even it removed
    } else if (file.status === "error") {
      message.error("Upload failed.");
    }
  };

  const customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <Popover
      placement="left"
      content={imageHoverPopover(imageUrl, isProcess)} // FIXME: One file should have one component only
    >
      <Upload
        accept="*.jpg,*.png"
        onChange={handleChange}
        customRequest={customRequest} // FIXME: Why do we need this ??
        showUploadList={false}
        multiple={false}
        maxCount={1}
      >
        <Button
          size="small"
          type="dashed"
          className="bg-stone-100 rounded-lg"
          icon={<FileAddOutlined />}>Select File</Button>
      </Upload>
    </Popover>
  );
}

export default ImageSelector;
