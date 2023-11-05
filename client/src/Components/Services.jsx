import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Services() {
    const allItems = JSON.parse(localStorage.getItem('user'));
    const [services, setServices] = useState([]);
    const [user, setUser] = useState({});
    useEffect(() => {
        console.log("useEffect");
        console.log("useEffect:::::",allItems._id);
        axios.get('http://localhost:8080/services/'+allItems._id)
        .then((response)=>{
            console.log("RESPONSESSS:::::",response.data);
            setServices(response.data.services);
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));

        })
        .catch((error)=>{
            console.log(error);
        })
    }, []);

    const handleActivate = async (service)=>{
        try{
            const response = await axios.post('http://localhost:8080/activate-service',{service: service,customerId: allItems._id});
            console.log("RESPONSE:::",response.data);
            localStorage.setItem('user', JSON.stringify(response.data.updatedUser));
            window.location.reload();
        }catch(error){
            console.log("error:"+error.response.data.message);
            if(error.response && error.response.status >=400 && error.response.status <=500){
                console.log(error.response.data.message);
            }
        }
    }

    const handleDeactivate = async (service)=>{
        try{
            const response = await axios.post('http://localhost:8080/deactivate-service',{service: service,customerId: allItems._id});
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data.updatedUser));
            window.location.reload();
        }catch(error){
            console.log("error:"+error.response.data.message);
            if(error.response && error.response.status >=400 && error.response.status <=500){
                console.log(error.response.data.message);
            }
        }
    }
  return (
    <div className='absolute top-[104px] w-full h-[calc(100vh-104px)] border'>
        <div className='border text-center font-bold text-4xl p-4'>
          <h1>Services</h1>
        </div>
        <div>
          <table className='w-full border border-black'>
            <tr>
              <th className='p-1 border border-black'>Name</th>
              <th className='p-1 border border-black'>Includes</th>
              <th className='p-1 border border-black'>Price</th>
              <th className='p-1 border border-black'>Activate/Deactivate</th>
            </tr>
                {
                    services.map((service)=>{
                        return (
                        <tr key={service._id}>
                            <td className='p-1 border border-black'>{service.serviceName}</td>
                            <td className='p-1 border border-black'>{service.includes}</td>
                            <td className='p-1 border border-black text-right'>{service.price}</td>
                            <td className='p-1 border border-[1px] border-black flex flex-row justify-center items-center border-black text-center'>
                              {
                                !user?.activePackages?.some(activePackage => activePackage._id === service._id) ? <button onClick={()=>handleActivate(service)} className='bg-green-400 border rounded-md p-1 text-white font-bold'>Activate</button>
                                : <button onClick={()=>handleDeactivate(service)} className='bg-red-400 border rounded-md p-1 text-white font-bold'>Deactivate</button> 
                              }
                            </td>
                        </tr>
                        )
                    })
                }
          </table>
        </div>
      </div>
  )
}

export default Services
