import React from 'react'
import CustomInput from '../../components/input/Input'
import UploadComponent from '../../components/uploader/Uploader'
import Customize from '../customize/Customize'
import Button from '../../components/button/Button'
import { apiBaseLink } from '../../pages'
import {Oval} from 'react-loader-spinner'
import CustomModal from '../../components/modal/modal'
import ClipboardJS from "clipboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyUploader from '../../components/uploader2/Uploader2'

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
      autoClose: 3000,
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

const NewUser = () => {
    
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [logoUrl, setLogoUrl] = React.useState('')
    const [backdropOn, setBackdropOn] = React.useState(false)
    const [validated, setValidated] = React.useState(false)
    const [codeSent, setCodeSent] = React.useState(false)
    const [codeValid, setCodeValid] = React.useState(false)
    const [validationLoader, setValidationLoader] = React.useState(false)
    const [verificationCode, setVerificationCode] = React.useState('')
    const [generatedCode, setGeneratedCode] = React.useState(Math.floor(Math.random()* 1000000))
    const [width, setWidth] = React.useState('180')
    const [height, setHeight] = React.useState('180')
    const [colorLight, setColorLight] = React.useState('#ffffff')
    const [colorDark, setColorDark] = React.useState('#000000')
    const [logoWidth, setLogoWidth] = React.useState(40)
    const [logoHeight, setLogoHeight] = React.useState(40)
    const [dotScale, setDotScale] = React.useState(0.7)
    const [apiKey, setApiKey] = React.useState('')
    const [userId, setUserId] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [error, setError] = React.useState('')
    const [selectedValue, setSelectedValue] = React.useState("");
    const [selectedAnswer, setSelectedAnswer] = React.useState("");

    const copyButtonRef = React.useRef(null);

    

    const postObject ={
        name: name,
        email: email,
        logoUrl: logoUrl,
        question: selectedValue,
        answer: selectedAnswer,
        settings: {
            width: width,
            height: height,
            colorLight: colorLight,
            colorDark: colorDark,
            logoWidth: logoWidth,
            logoHeight: logoHeight,
            dotScale: dotScale

        }
    }
    
    async function getApiKey(){
        try {
            setLoading(true)
          const data = await fetch(`${apiBaseLink}/addUser`,{
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(postObject)
          }).then(data => data.json())
           if(data.apiKey){
            setApiKey(data.apiKey)
           setUserId(data.userID)
           setOpen(true)
           setLoading(false)
           }
           else{
                setError('there seems to be an issue')
           }
          
         
        } catch (error) {
          console.log(error);
          
        }
        
      }
      const hashKey = (key:string)=>{
        var len = key.length
        if (len <= 3) {
          return key;
        } else {
          const asterisks = '*'.repeat(len / 4);
          return asterisks + key.slice(len - 3);
        } 
      }

      function handleSend(){

      }

     
      const handleCopybutton = (text: string, title: string) => {
        if (copyButtonRef.current) {
            new ClipboardJS(copyButtonRef.current, {
              text: () => text ,
            });
            alert(`your ${title} has been copied to the clipboard!`);
          }
      };
      function handleCopyAll(){
            handleCopybutton(`User ID: ${userId}   API Key: ${apiKey}`, 'User ID and API key')
            handleCopybutton(`User ID: ${userId}   API Key: ${apiKey}`, 'User ID and API key')

      }

      async function handleValidation(){
        if(name && email){
          setValidationLoader(true)
        
        var msg = ''
        try {
          const data = await fetch(`${apiBaseLink}/sendNewUserMail`, {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
              code: generatedCode,
              email: email
            })
          }). then(data => data.json()).then(data => msg = data.msg)
        } catch (error) {
          setValidationLoader(false)
          showToastMessage("email rejected", 'error')
        }
        if(msg === 'OK'){
          setValidationLoader(false)
          showToastMessage("code sent", 'success')
          setCodeSent(true)
        }
        if(msg === 'invalid email'){
          showToastMessage("input valid email", 'error')
          setValidationLoader(false)
        }
        if(msg === 'exists'){
          showToastMessage("email already exists", 'error')
          setValidationLoader(false)
        }
        }
        else{
          showToastMessage("input name and email", 'error')
        }
        
    }
    async function handleResend(){
      
  }
  async function handleContinue(){
    console.log(verificationCode)
    console.log(generatedCode)
    if(parseInt(verificationCode) === generatedCode){
      setCodeSent(false)
      setCodeValid(true)
    }
    else{
      console.log('error occured in vaidating')
    }
  
    
}
async function handleProceed(){
  setCodeValid(false)
  showToastMessage('success', 'success')
  setValidated(true)
  
}
function handleCancel(){
  setCodeValid(false)
}

const handleSelectionChange = (event: any) => {
  setSelectedValue(event.target.value);
};



  return (
    <div className='flex flex-col items-center w-[100%] gap-4 p-4 mt-[5%] h-[100%]'>
        {backdropOn?  
        <div className='z-[20] fixed top-[0] bg-black bg-opacity-30 w-[100vw] h-[100vh]'>

        </div>
      : ''}
      <ToastContainer />
        <div className='w-[90%] max-w-[30rem] flex flex-col items-center gap-[2rem]'>
            <CustomInput isOutlined value={name} onChange={(value)=> setName(value)} label='Name' />
            <CustomInput isOutlined value={email} onChange={(value)=> setEmail(value)} label='email' />
            
                {validated? 
                  <div className='w-[100%] flex flex-col gap-[2rem] items-center'>
                    <div className='w-[100%]'>
                    <input type='checkbox' id='customizeShow' className="peer/checker2 hidden " />
                    <label className=" w-[100%] " htmlFor='customizeShow'><Button onClick={()=> setBackdropOn(true)} text='Click here to customize QR' isOutline /></label>
                    <div className=" text md:w-[100%] z-[100]  w-[100%] h-[100vh] flex flex-row  fixed top-[0] right-[-100%] z-100  peer-checked/checker2:right-0 duration-500 ">
                        <label key={23} htmlFor='customizeShow'><div onClick={()=> setBackdropOn(false)} className='bg-black bg-opacity-0 flex flex-col  md:w-[62vw] lg:w-[68vw] h-[100vh]' >
                
                        </div></label>
                        <div className='bg-[#ffffff] flex flex-col w-[100vh]  md:w-[38%] lg:w-[32%] overflow-auto'>
                            <div className='flex flex-row justify-between items-baseline align-middle pl-8 pr-8'>
                                <h2 className='mt-0 text-xl font-bold'>Customize</h2>
                                <label key={23} onClick={()=> setBackdropOn(false)}  className="text-[3rem] text-black mt-0 rotate-45 hover:cursor-pointer" htmlFor='customizeShow'>+</label>

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
                <MyUploader value64Setter={setLogoUrl} placeholder='Click here to upload logo' />

                <div className='w-[10rem]'>
                    <Button text={loading?
                        <div className='flex flex-row items-center '>
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
                             <div>Fething</div>
                      </div>
                        : 'Get ID & API key'} onClick={getApiKey} />
                </div>
                  </div>
                : <div className='w-[8rem] '>
                <Button text={validationLoader? <div className='flex flex-row items-center '>
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
                       <div>Validating</div>
                </div> : 'Validate'} onClick={handleValidation} />
              </div>}
               
        </div>
        <CustomModal isOpen={open}
            handleDone={handleSend}
            handleClose={handleCopyAll}
            doneText={'send to email'}
            closeText={'copy all'}
            title='Details'
            passRef={copyButtonRef}
            hasExit
            exit={()=>setOpen(false)}

        >
            <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2 text-[#4c4d4d]  overflow-auto'>
                    <div className='flex flex-row items-center font-bold  justify-between'>User ID: 
                    <img className="relative cursor-pointer" ref={copyButtonRef} src='/copy.svg' onClick={()=> handleCopybutton(userId, 'User ID')} alt='copy to clipboard'/>
                    </div> 
                <div>{userId} </div>
                </div>
                <div className='flex flex-col gap-2 text-[#4c4d4d]  overflow-auto'>
                    <div className='flex flex-row items-center font-bold justify-between'>API Key: 
                    <img className="relative cursor-pointer" ref={copyButtonRef} src='/copy.svg' onClick={()=> handleCopybutton(apiKey, 'API key')} alt='copy to clipboard'/>
                    </div> 
                <div>{hashKey(apiKey)} </div>
                </div>
            </div>
        </CustomModal>
        <CustomModal isOpen={codeSent}
            handleClose={handleResend}
            handleDone={handleContinue}
            doneText={'Continue'}
            closeText={'Resend code'}
            hasExit
            exit={()=>setCodeSent(false)}
            title='Verification'
        >
          <div className='mb-[1rem]'>
            <div className='text-[0.85rem] text-gray-500  mb-[2rem]'>A seven digit code has been sent to your email, input it below</div>
            <CustomInput isOutlined value={verificationCode} label='XXXXXXX' onChange={(value)=> setVerificationCode(value)} />
          </div>
        </CustomModal>
        <CustomModal isOpen={codeValid}
          title='Security question'
          doneText={'proceed'}
          closeText={'cancel'}
          handleDone={handleProceed}
          handleClose={handleCancel}



          >
          <div className='w-[100%]'>
            <div className='mb-[0.2rem] text-[0.9rem]'>Select a security question</div>
             <div>
             <div className='text-[0.7rem] mt-[0.5rem] mb-[0.7rem]'>Tip: select a question you would definitely remember the answer to</div>
                <select className='w-[100%] bg-transparent border-[#c2c1c1] focus:border-[#48BBED] text-[0.9rem] text-[#5c5c5c] border-[0.1rem] p-[0.65rem] rounded-[0.45rem] mb-[1rem]' value={selectedValue} onChange={handleSelectionChange}>
                  <option value="">pick a question</option>
                  <option value="What was your childhood nickname?">What was your childhood nickname? </option>
                  <option value="In what city did you meet your spouse/significant other?">In what city did you meet your spouse/significant other?</option>
                  <option value="What is the name of your favorite childhood friend?">What is the name of your favorite childhood friend? </option>
                  <option value="What is your oldest sibling’s birthday month and year?">What is your oldest sibling’s birthday month and year? </option>
                  <option value="What is the middle name of your youngest child?">What is the middle name of your youngest child? </option>
                  <option value="In what city or town did your mother and father meet?">In what city or town did your mother and father meet?  </option>
                  <option value="In what city or town was your first job?">In what city or town was your first job? </option>
                </select>
                
              </div>
              
              {selectedValue? <CustomInput isOutlined isLightGrey label='Answer' value={selectedAnswer} onChange={(value)=> setSelectedAnswer(value)} /> : ''}
          </div>
        </CustomModal>
    </div>
  )
}

export default NewUser