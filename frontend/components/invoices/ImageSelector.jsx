import { useState, useEffect } from "react";
import {
  FileAddOutlined,
} from "@ant-design/icons";
import { message, Upload, Popover, Button } from "antd";
import { useBillContext } from "@/context/BillContext";
import exifr from "exifr";
import imageHoverPopover from "@/components/invoices/imagePopover";

const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
};

function ImageSelector({ id, renderSource, objectId = null, record }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState();

  const [success, setSuccess] = useState(false);
  const { dispatch } = useBillContext()

  useEffect(() => {
    let flag = true;
    if (flag) {
      setImageUrl(renderSource);
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
              record.image_src === "" &&
                dispatch({
                  type: "addItem",
                  payload: {
                    objectId: objectId,
                  }
                });
              dispatch({
                type: "setImageData",
                payload: {
                  id,
                  description: selectedFile.name.split('.')[0],
                  image_src: imageUrl,
                  height: calculatedHeight,
                  width: calculatedWidth,
                  objectId: objectId,
                },
              });
              message.success("Successfully uploaded");
            }
          } else {
            message.error("Invalid Image");
          }
        } catch (exc) {
          message.error("Failed to load image");
          alert(exc);
        }

        imageFile.onerror = function () {
          message.error("Failed to load image");
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
      content={imageHoverPopover(record)}
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
