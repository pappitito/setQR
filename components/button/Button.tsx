import React from 'react'

interface Props{
    text: string | JSX.Element,
    isOutline?: boolean,
    onClick?: (e?: React.SyntheticEvent<EventTarget>) => void;

}

const Button = ({text, isOutline, onClick}:Props) => {
  return (
    <div>
        {isOutline? <div onClick={onClick}  className='text-[0.9rem] p-[0.4rem] cursor-pointer pr-4 pl-4 flex w-[100%] flex-row min-w-[6rem]  items-center justify-center rounded-[0.5rem] border-[0.1rem] hover:text-[#48BBED] text-[#bdbdbd] border-[#48BBED]'>{text}</div> : 
        <div onClick={onClick} className='text-[0.9rem] p-[0.5rem] w-[100%]  cursor-pointer pr-4 pl-4 flex flex-row min-w-[6rem] items-center justify-center text-white rounded-[0.5rem] bg-[#48BBED]'>{text}</div>
        }
    </div>
  )
}

export default Button