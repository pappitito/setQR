import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToastMessage = (message: string, type: string) => {
    switch (type) {
      case 'success':
        toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        autoClose: 2000,
        hideProgressBar: true,
    });
      break;
        
      case 'error':
        toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        autoClose: 2000,
        hideProgressBar: true,
    });
      break;
  
    case 'info':
        toast.info(message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        autoClose: 2000,
        hideProgressBar: true,
    });
      break;
    case 'warning':
        toast.warning(message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        autoClose: 2000,
        hideProgressBar: true,
    });
      break;
    
      default:
        break;
    }
  };

interface Props{

    value?: string
    value64Setter: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string
}

function MyUploader({value64Setter, placeholder, value}:Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleUpload = (file: File) => {
    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        var url = reader.result as string
      setImageUrl(url);
      setLoading(false);
        setImageUrl(url);
        value64Setter(url);
      // Process the file here, e.g. display an image preview or manipulate the file data
    };
    setLoading(false);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
        if (file.size <= 2 * 1024 * 1024) { // Check file size is less than or equal to 2MB
            showToastMessage('Logo added', 'success')
          handleUpload(file);
        } else {
        showToastMessage('Please select a file smaller than 2MB', 'error')
          
        }
      } else {
        showToastMessage('Invalid file format', 'error')
      }
    
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadButton = (
    <div className='flex flex-row items-center justify-center gap-4 text-white'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>{placeholder}</div>
    </div>
  );

  return (
    <div  onClick={handleButtonClick} className={`border-[0.188rem] cursor-pointer border-dashed  border-[#828282] p-[0.45rem] ${imageUrl? 'w-[8rem]' : 'w-[100%]'} ${value? 'w-[8rem]' : 'w-[100%]'}  flex flex-row justify-center items-center`}
    >
        <ToastContainer />
      <input ref={fileInputRef}
           accept=".png,.jpg,.jpeg"
        style={{ display: 'none' }} type="file" onChange={handleFileInputChange}/>
        <div >{value? <img src={value} alt="avatar" style={{ width: '100%', padding: '0.1rem' }} /> : imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', padding: '0.1rem' }} /> : uploadButton}</div>
      

    </div>
  );
}

export default MyUploader