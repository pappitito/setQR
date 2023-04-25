import React from 'react'

interface Props{
  label?: string,
  value: any,
  onChange: (value: any) => void;
  isOutlined?: boolean,
  isfancy?: boolean,
  isLightGrey? : boolean,

}


const CustomInput = ({label, value, onChange, isOutlined, isfancy, isLightGrey}: Props) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const fancy = (
    <div className='relative flex w-[100%]'>
      <div className='text-[0.8rem] text-[#7C7C7C] bg-white absolute top-[-0.6rem] left-[0.75rem] z-[120] pl-[0.3rem] pr-[0.3rem]'>{label}</div>
      <input className='relative bg-white text-[#000000] w-[100%] flex text-[0.9rem] focus:outline-none h-[2.4rem] justify-center pl-[0.9rem] rounded-[0.25rem] border-[0.07rem] border-[#888888]'
      value={value}
      onChange={handleInputChange}
      />
    </div>
  )

  const outlined = (
    <div className='relative flex w-[100%]'>
      <input className={`relative bg-transparent ${isLightGrey? 'text-[#777777]' :'text-[#c4c4c4]'} w-[100%] flex text-[0.9rem] focus:outline-none focus:border-[#48BBED] h-[2.7rem] justify-center pl-[0.9rem] rounded-[0.45rem] border-[0.1rem] ${isLightGrey? 'border-[#c2c1c1]':'border-[#828282]'}`}
      value={value}
      placeholder={label}
      onChange={handleInputChange}
      />
    </div>
  )

  const normal = (
    <div className='relative flex w-[100%]'>
      <input className='relative  text-[#000000] w-[100%] flex text-[0.9rem] focus:outline-none h-[2.7rem] justify-center pl-[0.9rem] rounded-[0.45rem] border-[0.1rem] '
      value={value}
      placeholder={label}
      onChange={handleInputChange}
      />
    </div>
  )

  return isOutlined? outlined : isfancy? fancy : normal
}

export default CustomInput

