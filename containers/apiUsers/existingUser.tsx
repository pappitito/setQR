import React from 'react'
import UploadComponent from '../../components/uploader/Uploader'
import CustomInput from '../../components/input/Input'
import Button from '../../components/button/Button'
import Customize from '../customize/Customize'
import CustomModal from '../../components/modal/modal'
import {Oval} from 'react-loader-spinner'
import { apiBaseLink } from '../../pages'
import ClipboardJS from "clipboard";
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

const ExistingUser = () => {
    const [userId, setUserId] = React.useState('')
    const [apiKey, setApiKey] = React.useState('')
    const [backdropOn, setBackdropOn] = React.useState(false)
    const [forgotOn, setForgotOn] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [continueLoading, setContinueLoading] = React.useState(false)
    const [continueLoading2, setContinueLoading2] = React.useState(false)
    const [validated, setValidated] = React.useState(false)
    const [validating, setValidating] = React.useState(false)
    const [verificationCode, setVerificationCode] = React.useState('')
    const [generatedCode, setGeneratedCode] = React.useState(Math.floor(Math.random()* 1000000))
    const [codeSent, setCodeSent] = React.useState(false)
    const [saving, setSaving] = React.useState(false)
    const [codeValid, setCodeValid] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')
    const [errorMsg2, setErrorMsg2] = React.useState('')
    const [errorMsg3, setErrorMsg3] = React.useState('')
    const [logoUrl, setLogoUrl] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [width, setWidth] = React.useState('180')
    const [height, setHeight] = React.useState('180')
    const [colorLight, setColorLight] = React.useState('#ffffff')
    const [colorDark, setColorDark] = React.useState('#000000')
    const [logoWidth, setLogoWidth] = React.useState(40)
    const [logoHeight, setLogoHeight] = React.useState(40)
    const [dotScale, setDotScale] = React.useState(0.7)
    const [selectedAnswer, setSelectedAnswer] = React.useState("");
    const [securityQuestion, setSecurityQuestion] = React.useState("");
    
    const copyButtonRef = React.useRef(null);

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

      }

    async function handleValidation(){
        if(userId && apiKey){
          setValidating(true)
        
        try {
          const data = await fetch(`${apiBaseLink}/getUserDetails`,{
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({userID: userId, apiKey: apiKey})
        }).then(data=> data.json())
          if(!data.status){
            setTimeout(()=>{
              showToastMessage('Invalid ID or API key', 'error')
              setValidating(false)
            }, 1500)
            
          }
          if(data.status){
            const user = data.userData
            const settings = user.settings
            var newHeight = '19'
            showToastMessage('Validated', 'success')
            setLogoUrl(user.logoUrl)
            setWidth(settings.width)
            setHeight(settings.height)
            setColorLight(settings.colorLight)
            setColorDark(settings.colorDark)
            setLogoWidth(settings.logoWidth)
            setLogoHeight(settings.logoHeight)
            setDotScale(settings.dotScale)
            
            setValidating(false)
            setValidated(true)

            
          }
          
        } catch (error) {
          console.log('caught error')
          setValidating(false)
          
        }
        }
        else{
          showToastMessage("Input user ID and API key", 'error')
        }


    }

    var msg =''
    async function handleContinue(){
        setContinueLoading(true)
        try {
            const data = await fetch(`${apiBaseLink}/checkEmail`,{
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({email: email})
            }).then(data=> data.json()).then(data=> {
                 msg = data.msg
                 setSecurityQuestion(data.question)
                })
        } catch (error) {
            setErrorMsg('something went wrong')
            setContinueLoading(false)
        }
        if(msg === 'OK'){
            var msg2 = ''
            try {
                const data = await fetch(`${apiBaseLink}/sendMail`,{
                    method: 'POST',
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({
                        code: generatedCode,
                        email: email})
                }). then(data => data.json()).then(data => msg2 = data.msg)
                if(msg2 === 'OK'){
                    setContinueLoading(false)
                    setForgotOn(false)
                    setCodeSent(true)
                    
                }
                else{
                    setErrorMsg('unable to send verification code')
                    setContinueLoading(false)
                }
            } catch (error) {
                setContinueLoading(false)
            }
        } else{
            setErrorMsg('email not found')
            setContinueLoading(false)
        }

    }

    async function handleSaveChanges(){
      var status = false
      const postObject ={
        userID: userId,
        logoUrl: logoUrl,
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
      try {
        setErrorMsg3('')
        setSaving(true)
        const data = await fetch(`${apiBaseLink}/editDetails`,{
          method: 'PATCH',
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(postObject)
        }).then(data => data.json())
        console.log(data);
        
        if(data.status === true){
          showToastMessage('Changes saved', 'success')
          const settings = data.settings
           setLogoUrl(data.logoUrl)
           setWidth(settings.width)
           setHeight(settings.height)
           setColorLight(settings.colorLight)
           setColorDark(settings.colorDark)
           setLogoWidth(settings.logoWidth)
           setLogoHeight(settings.logoHeight)
           setDotScale(settings.dotScale)
           setSaving(false)
        }
        else{
          setSaving(false)
          setErrorMsg3('unable to save changes')
        }
      } catch (error) {
        setSaving(false)
        console.log(error);
        
      }
    }

    async function handleVerify(){
        setContinueLoading2(true)
        var msg = ''
        if(parseInt(verificationCode) === generatedCode){
           setCodeSent(false)
           setCodeValid(true)
           setContinueLoading2(false)
          }
          else{
            setContinueLoading2(false)
            console.log('error occured in vaidating')
          }
      
    }

    async function handleResend(){
      
    }
    async function handleProceed(){
        setContinueLoading2(true)
        try {
            const data = await fetch(`${apiBaseLink}/checkAnswer`, {
              method: 'POST',
              headers: {"Content-type": "application/json"},
              body: JSON.stringify({
                email: email,
                answer: selectedAnswer
              })
            }). then(data => data.json()).then(data =>{
                
                if(data.msg === 'correct'){
                    setApiKey(data.apiKey)
                    setUserId(data.userID)
                    setCodeValid(false)
                    setContinueLoading2(false)
                    setOpen(true)

                }
                else{
                    setErrorMsg2('incorrect')
                    setContinueLoading2(false)
                }
                
            })
          } catch (error) {
            setContinueLoading2(false)
          }
        
    }
    async function handleCancel(){
      setCodeValid(false)
    }

  return (
    <div className='flex flex-col items-center w-[100%] gap-4 p-4 mt-[5%] h-[100%]'>
        {backdropOn?  
        <div className='z-[20] fixed top-[0] bg-black bg-opacity-30 w-[100vw] h-[100vh]'>

        </div>
      : ''}
        <ToastContainer />
        <div className='w-[90%] max-w-[30rem] flex flex-col items-center gap-[2rem]'>
        {errorMsg3? <div className='text-[0.7rem] text-red-600 italic mt-[-0.6rem] mb-[0.5rem]'>{errorMsg3}</div> : ''}
        <CustomInput  value={userId} onChange={(value)=> setUserId(value)} label='your User ID' />
        <CustomInput  value={apiKey} onChange={(value)=> setApiKey(value)} label='your API key' />
            
            {validated? 
                <div className='w-[100%] flex flex-col gap-[2rem] items-center'>
                    <div className='w-[100%]'>
                <input type='checkbox' id='customizeShow' className="peer/checker2 hidden " />
                <label className=" w-[100%] " htmlFor='customizeShow'><Button onClick={()=> setBackdropOn(true)} text='Click here to edit your saved customizations' isOutline /></label>
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
            <UploadComponent value={logoUrl} value64Setter={setLogoUrl} placeholder='Click here to change logo' />

            <div className='w-[10rem]'>
            <Button text={ saving? <div className='flex flex-row items-center '>
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
                 <div>Saving</div>
          </div> : 'Save changes'}

                 onClick={handleSaveChanges} />
            </div>
                </div>
            :
            <div className='w-[100%] flex flex-col items-center'>
                <div onClick={()=> setForgotOn(true)} className='text underline cursor-pointer hover:text-[#48BBED] text-white w-[100%] mt-[-0.6rem] mb-[1.5rem] text-[0.88rem]'>forgot ID or API key?</div>
                <div className='w-[8rem]'>
                <Button text={ validating? <div className='flex flex-row items-center '>
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
                 <div>validating</div>
          </div> : 'Validate'}

                 onClick={handleValidation} />
                </div>
            </div>}

        </div>
        <CustomModal isOpen={forgotOn}
        title='Retreive details'
            doneText={continueLoading? <div className='flex flex-row items-center '>
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
                 <div>Checking</div>
          </div> : 'Continue'}
            closeText={'cancel'}
            handleClose={()=> setForgotOn(false)}
            handleDone={handleContinue}
            >
            <div className='w-[100%]'>
                <div className='text-[0.85rem] mb-[1rem]'>Please input your email address</div>
                {errorMsg? <div className='text-[0.7rem] text-red-600 italic mt-[-0.6rem] mb-[0.5rem]'>{errorMsg}</div> : ''}
                <CustomInput isLightGrey isOutlined value={email} onChange={(value)=> setEmail(value)} label='Email' />
            </div>
        </CustomModal>
        <CustomModal isOpen={codeSent}
            handleClose={handleResend}
            handleDone={handleVerify}
            doneText={continueLoading2? <div className='flex flex-row items-center '>
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
                 <div>Verifying</div>
          </div> : 'Continue'}
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
          title='Answer security question'
          doneText={continueLoading2? <div className='flex flex-row items-center '>
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
                 <div>Verifying</div>
          </div> : 'Proceed'}
          closeText={'cancel'}
          handleDone={handleProceed}
          handleClose={handleCancel}



          >
          <div className='w-[100%]'>
            <div className='mb-[0.8rem] font-semibold text-[0.98rem]'>{securityQuestion}</div>
            
            {errorMsg2? <div className='text-[0.7rem] text-red-600 italic mt-[-0.6rem] mb-[0.5rem]'>{errorMsg2}</div> : ''}
             <CustomInput isOutlined isLightGrey label='Answer' value={selectedAnswer} onChange={(value)=> setSelectedAnswer(value)} />
          </div>
        </CustomModal>
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
    </div>
  )
}

export default ExistingUser