import React, { useState } from "react";
import { Upload, Button, message, Avatar } from "antd";
import ImgCrop from "antd-img-crop";
import { UploadOutlined } from "@ant-design/icons";

const Uploader = ({ profile }) => {
  const [fileList, setFileList] = useState([]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error("Image must smaller than 1MB!");
    }
    return isJpgOrPng && isLt1M;
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Upload Profile Image to DB

    // Pull and refresh
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);

    if (imgWindow) {
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  return (
    <ImgCrop grid>
      <Upload
        fileList={fileList}
        accept={"image/jpeg,image/png"}
        beforeUpload={beforeUpload}
        onChange={onChange}
        onPreview={onPreview}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>
          {typeof profile !== 'undefined' &&
            "Update Profile Image"
          }
          {typeof profile === 'undefined' &&
            "Upload Profile Image"
          }
        </Button>
      </Upload>
    </ImgCrop>
  );
};

export default function ProfileImage({ profile }) {
  var avatar = 
    typeof profile == 'undefined'
      ? "defaultavatar.png" 
      : profile.profileImage;

  return (
    <>
    <div className="image">
      <Avatar
        size={{
          xs: 48,
          sm: 64,
          md: 84,
          lg: 120,
          xl: 180,
          xxl: 220,
        }}
        src={avatar}
        alt="Profile"
      />
    </div>
    <div className="button">
      <Uploader profile={profile} />
    </div>
    </>
  );
}
