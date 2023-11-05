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
function Login(){
    const navigate = useNavigate();

    const classes= classnames('rounded shadow shadow-gray-400 w-full h-9 p-2 mb-4');

    // const handleClick=()=>{
    //     window.location.href = getGoogleOAuthURL();
    // }

    // const {auth, setAuth} = useContext(AuthContext)

    const [formData , setFormData] = useState({
        email: '',
        pass: '',
    });

    const { email, pass } = formData;

    const [error, setError] = useState();

    const onChange =(event) =>{
        setFormData((prevState)=>({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        // console.log(formData);
        const loginData = new FormData();
        loginData.append('email', formData.email);
        loginData.append('pass', formData.pass);
        console.log(formData)
        try{
            const response = await axios.post('http://127.0.0.1:8080/login',formData);
            console.log("DATA::::",response.data);
            
            // const allItems = jwt_decode(response);
            // localStorage.setItem('accessToken', response.data.access_token)
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/home');

            // console.log(localStorage.getItem('tokenData'));
            // console.log(localStorage.getItem('accessToken'));

            // switch (allItems['user_role']) {
            //     case "student":
            //         break;
            //     case "teacher":
            //         navigate('/subjects');
            //         break;
            //     case "admin":
            //         console.log(response.data.access_token);
            //         navigate('/subjects');
            //         break;
            //     default:
            //         break;
            // }
        }catch(error){
            console.log("error:"+error.response.data.message);
                setError(error.response.data.message);
            
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
                        {error && <div className="bg-red-500 text-white text-sm mb-2 w-full p-2 rounded text-center mb-6">{error}</div>}
                        <input className={classes} name="email" type="email" value={email} placeholder="E-mail address" onChange={onChange}/>
                        <input className={classes} name="pass" type="password" value={pass} placeholder="Password" onChange={onChange}/>
                        <SubmitButton type="submit" classes="rounded">Continue</SubmitButton>
                    </form>
                </div>
                <div className="text-sm text-slate-500 mt-7">Don't have an account?</div>
                <div className="text-sm text-cyan-600 mt-2"><Link to="/register">Create account</Link></div>
            </div>
        </div>
    )
}
export default Login;