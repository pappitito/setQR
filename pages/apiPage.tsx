import React from 'react'
import Head from 'next/head'
import Header from '../components/header/Header'
import CustomTab from '../components/customTab/CustomTab'
import NewUser from '../containers/apiUsers/newUser'
import ExistingUser from '../containers/apiUsers/existingUser'


const linkOptions = [
    {
      name: 'About',
      pageLink: '/about' 
    },
    {
      name: 'Documentation',
      pageLink: '/apiPage',
      
     
  
    },
    {
        name: 'Home',
        pageLink: '/',
        isButton: true,
       
    
      },
  
   
  
  ]


const ApiPage = () => {
    const sections = [
		{
			label: 'New User',
			component: <NewUser/>,
            key: 1
		},
		{
			label: 'Existing User',
			component: <ExistingUser/>,
            key: 2
		},
       
	];

  return (
   <>
     <Head>
        <link rel="shortcut icon" href="/setQR-icon.png" />
        <title>API</title> 
        <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1" />
      </Head>
    <Header links={linkOptions} />
    <div className='w-[100%] flex flex-col mt-[-0.8rem] md:mt-6 justify-center items-center'>
        <CustomTab tabs={sections} />
    </div>
   </>
  )
}

export default ApiPage