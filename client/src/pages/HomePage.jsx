import React,{useState} from 'react';
import NavBar from '../Components/NavBar'
import Services from '../Components/Services';
import SubmitButton from '../Components/SubmitButton';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';
import TopBar from '../Components/TopBar';
import Packages from '../Components/Packages';

function HomePage() {
  const location = useLocation();
  const pathName = location.pathname.split('/').filter((path) => path !== '');
  const navigate = useNavigate();
  const allItems = JSON.parse(localStorage.getItem('user'));
  const [phone, setPhone] = useState('');
  const classes= classnames('rounded shadow shadow-gray-400 w-full h-9 p-2 mb-4');
  const handleSubmit = async (event)=>{
    event.preventDefault();
    console.log(phone);
    try{
        const response = await axios.post('http://127.0.0.1:8080/phone',{telephone:phone,userId:allItems._id});
        console.log("DATA::::",response.data);
        navigate('/add_otp');
    }catch(error){
        console.log("error:"+error.response.data.detail);
        window.location.reload();

    }
}
  return (

    <>
    {
      allItems.phone_active ? 
      (<div>
        <NavBar/>
        <TopBar/>
        {
          pathName[0] === 'home' ?
            <Packages/>
            :
            <Services/>
        }
      </div> )
      :
      (
        <div className='w-full h-[100vh] flex flex-col items-center justify-center'>
              <div className=''>
                    <h1 className='mb-2 text-center text-2xl font-bold'>Welcome {allItems.userName}</h1>
                    <h1 className='mb-2 text-center text-md font-bold'>Please enter your phone number to continue</h1>
                    
              <form className="flex flex-col items-center justify-center w-full" onSubmit={handleSubmit}>
                        <input className={classes} name="phone" type="tel" value={phone} placeholder="Phone Number" onChange={(e)=>setPhone(e.target.value)}/>
                        <SubmitButton type="submit" classes="rounded">Continue</SubmitButton>
                    </form>
              </div>
        </div>
      )
    }
    
    
    </>
  )
}

export default HomePage
