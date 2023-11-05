// import { AiOutlineMenu } from "react-icons/ai";
import classnames from 'classnames';
import Logo from '../photos/logo.png'
import { Link ,useLocation} from 'react-router-dom'
function TopBar({white,black,onClickFunc,clicked}) {
  const location = useLocation();
    const pathName = location.pathname.split('/').filter((path) => path !== '');
    console.log("pathName::",pathName)
  return (
    <div className={`mb-6 z-10 bg-[#E9EBF5] fixed flex flex-row top-[55px] items-center justify-between shadow shadow-gray-300 h-[52px] w-full`}>
       {
        pathName[0] === 'home' ?
        <>
        <Link to={'/home'} className='flex justify-center items-center text-center font-bold w-1/2  bg-gray-400 h-[52px]'>
            <div className='text-center font-bold'>
                Your Packages
            </div>
        </Link>
        <Link to={'/packages'} className='flex justify-center items-center text-center font-bold w-1/2'>
            <div className='text-center font-bold'>
                Packages
            </div>
        </Link>
        </>

        :
        <>
        <Link to={'/home'} className='flex justify-center items-center text-center font-bold w-1/2 '>
            <div className='text-center font-bold border border-r-2'>
                Your Packages
            </div>
        </Link>
        <Link to={'/packages'} className='flex justify-center items-center text-center font-bold w-1/2  bg-gray-400 h-[52px]'>
            <div className='text-center font-bold'>
                Packages
            </div>
        </Link>
        </>
       }

        
    </div>
  )
}

export default TopBar
