import { Outlet } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import logo from '../assets/logo.jpg';
import img1 from '../assets/human1.jpg'
import img2 from '../assets/human2.jpg'
import img3 from '../assets/human3.jpg'
import { SignIn } from '@clerk/clerk-react';



const Login = () => {
  return (
    /* Background */
    <div className="min-h-screen bg-[url('/bg.jpg')]  bg-cover">
        <div className='p-5 '>
          <img src={logo} alt='logo' className='h-10 w-20'/>
        </div>
        <div className='p-10 flex gap-10'>
          <div className='flex flex-col gap-4 justify-center'>
            <div className='flex gap-2'>
              <div className='flex '>
                <img src={img1} alt='img1' className='h-7 rounded-full w-7'/>
                <img src={img2} alt='img2' className='h-7 rounded-full w-7 -ml-2'/>
                <img src={img3} alt='img3' className='h-7 rounded-full w-7 -ml-2'/>
              </div>
              <div className='text-sm'>
                <div className='flex gap-0'>
                  {
                    Array(5).fill(0).map((_, i) => (<FaStar className='text-amber-400' />
                    ))
                  }
                </div>
                <p className='text-blue-950'>Used by 12k+ developers</p>
              </div>
            </div>
            <h1 className='text-blue-950 text-5xl font-bold'>More than just friends truly connect</h1>
            <p className='text-blue-950 text-lg'>connect with global community on sharechat</p>
          </div>
          {/*Right Login form */}
          <div className='w-150'>
            <SignIn/>
          </div>
        </div>
    </div>
  )
}

export default Login