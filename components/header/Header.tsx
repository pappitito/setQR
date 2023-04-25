import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../button/Button'

export interface Props {
    links?: Links[]
}

 interface Links {
    name: string,
    pageLink: string,
    isButton?: boolean,
    isOutlineButton?: boolean
}

const Header = ({links}: Props) => {
  return (
    <div key={'general'} className='flex flex-row justify-between p-2 pl-6 pr-6'>
      <Link className='flex w-[30%]' href='/'>
        
          <Image className='' src='/setQR.svg' alt='logo'
           width={130} height={130} priority  />
          
        
      </Link>
      
      <div className="flex flex-row z-10 items-center">
                <input type='checkbox' id='menushow' className="peer/checker hidden " />
                <label className="md:hidden " htmlFor='menushow'><Image  className='hover:cursor-pointer'  src='/menuCopy.png' alt='ig'
                         width={40} height={40} priority/></label>
                <div className='md:flex md:flex-row hidden items-center gap-[2rem]'>
                    {links? links.map((link)=>{
                         return  link.isButton? <Link href={link.pageLink}>
                             <Button text={link.name} isOutline={link.isOutlineButton} />
                              </Link> : <Link className='text-white' href={link.pageLink}>{link.name}</Link> 
                       }) : ''}
                 </div>
                
                <ul key={0} className=" text-slate-800 md:hidden   p-6 w-[50%] h-[100vh] flex flex-col gap-6 items-center align-middle fixed top-[0] right-[-100%] z-100 bg-[#48BBED] peer-checked/checker:right-0 duration-500 ">
                    <label key={2} className="text-6xl text-white absolute top-[1rem] right-[1rem]   hover:cursor-pointer" htmlFor='menushow'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.8} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            </label>
                    <div key={1} className="mt-[4.3rem] flex flex-col justify-center items-center gap-6">
                        {links? links.map(link =>{
                        return(
                            <Link className='hover:scale-110 hover:underline duration-500 text-center text-white' href={link.pageLink}>{link.name}</Link>
                        )
                    }): ''}
                    </div>
                </ul>
                
            </div>
    </div>
  )
}

export default Header