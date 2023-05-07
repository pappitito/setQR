import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header/Header'
import Image from 'next/image'
import UploadComponent from '../components/uploader/Uploader'
import Button from '../components/button/Button'
import React from 'react'
import Customize from '../containers/customize/Customize'
import CustomModal from '../components/modal/modal'
import {Oval} from 'react-loader-spinner'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyUploader from '../components/uploader2/Uploader2'


export const apiBaseLink = 'https://setqrtest.onrender.com/api'

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

const linkOptions = [
  {
    name: 'About',
    pageLink: '/about' 
  },
  {
    name: 'API',
    pageLink: '/apiPage',
    isButton: true,
   

  },

 

]

const Home: NextPage = () => {

  const [backdropOn, setBackdropOn] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [content, setContent] = React.useState('')
  const [QRImg, setQRImg] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [width, setWidth] = React.useState('180')
  const [height, setHeight] = React.useState('180')
  const [colorLight, setColorLight] = React.useState('#ffffff')
  const [colorDark, setColorDark] = React.useState('#000000')
  const [logoWidth, setLogoWidth] = React.useState(50)
  const [logoHeight, setLogoHeight] = React.useState(50)
  const [dotScale, setDotScale] = React.useState(0.7)
  const [logoUrl, setlogoUrl] = React.useState('')

  const logoExample = 'data:image/png;base64,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'

  
  var options = {
    content: content,
    width: parseInt(`${width}0`),
    height: parseInt(`${height}0`),
    colorDark : colorDark,
    colorLight : colorLight,
    logoUrl: logoUrl || logoExample,
    logoWidth: logoWidth*10,
    logoHeight: logoHeight*10,
    dotScale: dotScale,
    adminKey: 'skjgfhyuigyu7876',
  }

  var optionsMain = {
    content: content,
    width: parseInt(`${width}0`),
    height: parseInt(`${height}0`),
    colorDark : colorDark,
    colorLight : colorLight,
    logoUrl: logoUrl, 
    logoWidth: logoWidth*10,
    logoHeight: logoHeight*10,
    dotScale: dotScale,
    adminKey: 'skjgfhyuigyu7876',
  }

  

  async function getQR(){
    try {
      const data = await fetch(`${apiBaseLink}/adminGenerate`,{
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(optionsMain)
      }).then(data => data.json()).then(data => data.QR)
      
      return data
     
    } catch (error) {
      console.log(error);
      
    }
    
  }

  const handleDownload = () => {
    const imageName = `QR${Math.floor(Math.random()*10000)}`
    fetch(QRImg)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${imageName}.png`);
        document.body.appendChild(link);
        link.click();
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
      setOpen(false)
  };

 

  const handleGenerate = async ()=>{
    setLoading(true)
    const data = await getQR()
    setQRImg(data)
    setLoading(false)
    showToastMessage('generated', 'success')
    setOpen(true)
  }
  const handleCancel = ()=>{
    setOpen(false)
  }

  return (
    <div>
      <Head>
        <title>setQR</title>
        <link rel="shortcut icon" href="/setQR-icon.png" />
        <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1" />
        
      </Head>
      
      {backdropOn?  
        <div className='z-[20] fixed top-[0] bg-black bg-opacity-30 w-[100vw] h-[100vh]'>

        </div>
      : ''}
      <Header links={linkOptions} />
      <ToastContainer />
      <div className='flex flex-col items-center  mt-[3.5rem]'>
        <Image className='flex md:scale-125 md:mb-7' src='/setQR-icon.png' alt='Qr icon' width={135} height={135} priority />
        <div className='flex flex-col items-center w-[80%] md:w-[60%] text-[0.9rem] min-w-[15rem] max-w-[30rem] gap-6'>
            <input className='bg-white rounded-[0.5rem] focus:outline-none w-[100%] mt-4 p-3 pl-4 ' type="text" placeholder='content to be encoded'
              value={content} onChange={(e)=>setContent(e.target.value)}
            />
            
            <div className='w-[100%]'>
            <input type='checkbox' id='customizeShow' className="peer/checker2 hidden " />
            <label className=" w-[100%] " htmlFor='customizeShow'><Button onClick={()=> setBackdropOn(true)} text='Click here to customize QR' isOutline /></label>
            <div className=" text md:w-[100%] z-[100]  w-[100%] h-[100vh] flex flex-row  fixed top-[0] right-[-100%] z-100  peer-checked/checker2:right-0 duration-500 ">
                <label key={23} htmlFor='customizeShow'><div onClick={()=> setBackdropOn(false)} className='bg-black bg-opacity-0 flex flex-col text-yellow-400 md:w-[62vw] lg:w-[68vw] h-[100vh]' >
                
                    </div></label>
                <div className='bg-[#ffffff] flex flex-col w-[100%]  md:w-[38%] lg:w-[32%] overflow-auto'>
                  <div className='flex flex-row justify-between items-center mt-8 align-middle pl-8 pr-8'>
                    <h2 className='mt-0 text-xl font-bold'>Customize</h2>
                    <label key={23} onClick={()=> setBackdropOn(false)}  className="text-[3rem] text-black mt-0 hover:cursor-pointer" htmlFor='customizeShow'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.8} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </label>

                  </div>
                <div className='flex flex-col mt-[1.5rem] items-center  md:mt-[4rem]'>
                  <Customize stateSetter={setBackdropOn}
                  logoUrl={logoUrl}
                  width={width} widthSetter={setWidth}
                  height={height} heightSetter={setHeight}
                  colorDark={colorDark} colorDarkSetter={setColorDark}
                  colorLight={colorLight} colorLightSetter={setColorLight}
                  logoWidth={logoWidth} logoWidthSetter={setLogoWidth}
                  logoHeight={logoHeight} logoHeightSetter={setLogoHeight}
                  dotScale={dotScale} dotScaleSetter={setDotScale}
                   />
                  
                </div>
              </div>
            </div>
            </div>
            
            <MyUploader value64Setter={setlogoUrl}  placeholder='Click here to upload logo' />
            <div className='w-[10rem] mt-8'>
              <Button text={loading? <div className='flex flex-row items-center '>
                <Oval
                     height={18}
                     width={18}
                     color="#ffffff"
                     wrapperStyle={{}}
                     wrapperClass=""
                     visible={true}
                     ariaLabel='oval-loading'
                     secondaryColor="lightgray"
                     strokeWidth={6}
                     strokeWidthSecondary={6}
      
                     />
                     <div>generating QR</div>
              </div> : 'generate QR'} onClick={handleGenerate} />
            </div>
            <CustomModal 
                
                isOpen={open}
                handleClose={handleCancel}
                handleDone={handleDownload}
                doneText={(<div className='flex items-center gap-[0.2rem]'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Download</div>)}
            ><div className='flex w-[12rem] items-center justify-center  h-[12rem]'>
              <img src={QRImg} alt="QR" />
              </div></CustomModal>
            
          </div>        
      </div>
      
      
    </div>
  )
}

export default Home
