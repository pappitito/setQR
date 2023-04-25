import React from 'react'

interface Tab{
    label: string,
    component:  string | JSX.Element,
    key: number

}

interface Props{
    tabs: Tab[]
}

const CustomTab = ({tabs}: Props) => {

    const [selectedTab, setSelectedTab] = React.useState(tabs[0].key)

    function tabCheck(key: number){
        if(selectedTab === key){
            return 'border-b-[0.4rem] duration-300 border-b-[#48BBED] text-[#48BBED]'
        }
        else{
            return 'border-b-[0.11rem] duration-300 border-b-[white] text-white'
        }
    }
    function tabContentCheck(key: number, component: string| JSX.Element){
        if(selectedTab == key){
            return component
        }
        
    }

  return (
   <div className='flex flex-col w-[100%] items-center'>
         <div className='flex flex-row '>
        {tabs?
        
        tabs.map((tab)=>{
            var tabLength = tabs.length
            if(tab.key === tabLength){
                return(
                    <div onClick={()=> setSelectedTab(tab.key)} className={` leading-6 p-5 pb-4 ${tabCheck(tab.key)} cursor-pointer  `}>
                        <div className=' text hover:scale-105 duration-300 '>{tab.label}</div>
                    </div>
                )
            }
            else{
                return(
                    <div onClick={()=> setSelectedTab(tab.key)} className={`flex flex-row gap-3 p-5  pb-4 ${tabCheck(tab.key)} relative cursor-pointer  leading-6 `}>
                        <div className=' text hover:scale-105 duration-300 '>{tab.label}</div>
                        <div className='text-white rotate-90 mr-[-1.1rem] absolute right-[0rem]'>__</div>
                    </div>
                )
            }
        })
        : ""}
        </div>
        <div className='w-[100%]'>
            {tabs.map((tab)=>{
               return tabContentCheck(tab.key, tab.component)
            })}
        </div>
   </div>
  )
}

export default CustomTab