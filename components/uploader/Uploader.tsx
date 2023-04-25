import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

interface Props{

    value?: string
    value64Setter: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isLt2M;
};

const UploadComponent = ({value64Setter, placeholder, value}:Props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
        value64Setter(url);
      });
    }
  };

  const uploadButton = (
    <div className='flex flex-row items-center justify-center gap-4 text-white'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>{placeholder}</div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        className={`border-[0.188rem] border-dashed border-[#828282] p-[0.45rem] ${imageUrl? 'w-[8rem]' : 'w-[100%]'} ${value? 'w-[8rem]' : 'w-[100%]'}  flex flex-row justify-center items-center`}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {value? <img src={value} alt="avatar" style={{ width: '100%', padding: '0.1rem' }} /> : imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', padding: '0.1rem' }} /> : uploadButton}
      </Upload>
      
    </>
  );
};

export default UploadComponent;