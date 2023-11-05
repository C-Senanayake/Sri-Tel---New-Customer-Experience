import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { FcGoogle } from "react-icons/fc";
import Logo from '../photos/logo.png'
import InputField from '../Components/InputField';
import SubmitButton from '../Components/SubmitButton';
import classnames from 'classnames';
// import { AuthContext } from '../Contexts/AuthContext';
import axios from 'axios';
import jwt_decode from "jwt-decode";
// import getGoogleOAuthURL from '../utils/GoogleOAuth';
function OTP(){
    const navigate = useNavigate();
    const allItems = JSON.parse(localStorage.getItem('user'));

    const classes= classnames('rounded shadow shadow-gray-400 w-full h-9 p-2 mb-4');

    // const handleClick=()=>{
    //     window.location.href = getGoogleOAuthURL();
    // }

    // const {auth, setAuth} = useContext(AuthContext)
    const [otp, setOtp] = useState('');
    

    const handleSubmit = async (event)=>{
        event.preventDefault();
        try{
            const response = await axios.post('http://127.0.0.1:8080/otp',{otp:otp,userId:allItems._id});
            console.log("DATA::::",response.data);
            
            // const allItems = jwt_decode(response);
            // localStorage.setItem('accessToken', response.data.access_token)
            localStorage.clear();
            navigate('/');

           
        }catch(error){
            console.log("error:"+error.response.data.detail);
        }
    }


    return (
        <div className="flex justify-center items-center h-full ">
            <div className="top-[20%] absolute flex flex-col items-center rounded rounded-sm shadow shadow-gray-400 w-96 h-fit py-10 px-10">
                <div className="w-5/12 mb-10 mt-10"><img src={Logo} alt="Logo"/></div>
                {/* <div className="flex items-center  rounded rounded-sm w-3/4 shadow shadow-gray-300">
                    <button className="flex items-center justify-center p-1" onClick={handleClick}><FcGoogle className=" text-xl mx-3.5"/>
                    Continue with Google</button>
                </div>
                <div className="w-full my-5" style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: '1', borderTop: '1px solid black' }}></div>
                    <span style={{ margin: '0 10px' }}>or</span>
                    <div style={{ flex: '1', borderTop: '1px solid black' }}></div>
                </div> */}
                <div className="w-full">
                    <form className="flex flex-col items-center justify-center w-full" onSubmit={handleSubmit}>
                        {/* {error && <div className="bg-red-500 text-white text-sm mb-2 w-full p-2 rounded text-center mb-6">{error}</div>} */}
                        <input className={classes} name="otp" type="text" value={otp} placeholder="OTP" onChange={(e)=>setOtp(e.target.value)}/>
                        <SubmitButton type="submit" classes="rounded">Continue</SubmitButton>
                    </form>
                </div>
                
            </div>
        </div>
    )
}
export default OTP;