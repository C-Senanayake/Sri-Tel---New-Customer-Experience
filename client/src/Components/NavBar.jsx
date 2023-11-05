// import { AiOutlineMenu } from "react-icons/ai";
import classnames from 'classnames';
import Logo from '../photos/logo.png'
function NavBar({white,black,onClickFunc,clicked}) {
    const classes = classnames('text-3xl cursor-pointer',{
        'text-white':white,
        'text-black':black
    });
    // console.log("Data::",localStorage['tokenData'].firstName)
    const allItems = JSON.parse(localStorage.getItem('user'));
    console.log("allItems::",allItems)
    const handleLogout = () => {
      localStorage.clear();
      window.location.href = '/';
    }
  return (
    
    <nav className={`mb-6 z-10 bg-[#E9EBF5] fixed flex items-center justify-between shadow shadow-gray-500 h-[52px] py-3 px-4 w-full`}>
        {/* <AiOutlineMenu className={classes} onClick={onClickFunc}/> */}
        <img className='w-52' src={Logo} alt="Logo"/>
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <h2 className="font-bold opacity-50">{allItems.userName} {allItems?.telephone} </h2>
            <img className=" w-8" src="http://localhost:3000/profilecircle.svg" alt=""/>
          </div>
          <div className="">
          <button onClick={handleLogout} className='bg-transparent'><img className=" w-8 text-black"  src="http://localhost:3000/logoutcurve.svg" alt=""/></button>
          </div>
        </div>
    </nav>
  )
}

export default NavBar
