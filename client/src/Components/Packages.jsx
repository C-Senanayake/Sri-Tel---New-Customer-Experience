import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Packages() {
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

    const handleActivate = async (serviceId)=>{
        try{
            const response = await axios.post('http://localhost:8080/activate-service',{serviceId: serviceId,customerId: allItems._id});
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

    const handleDeactivate = async (serviceId)=>{
        try{
            const response = await axios.post('http://localhost:8080/deactivate-service',{serviceId: serviceId,customerId: allItems._id});
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
          <h1>Your Packages</h1>
        </div>
        <div>
          <table className='w-full border border-black'>
            <tr>
              <th className='p-1 border border-black'>Name</th>
              <th className='p-1 border border-black'>Includes</th>
              <th className='p-1 border border-black'>Price</th>
            </tr>
                {
                    user?.activePackages?.map((service)=>{
                        return (
                        <tr key={service._id}>
                            <td className='p-1 border border-black'>{service.serviceName}</td>
                            <td className='p-1 border border-black'>{service.includes}</td>
                            <td className='p-1 border border-black text-right'>{service.price}</td>
                        </tr>
                        )
                    })
                }
          </table>
        </div>
      </div>
  )
}

export default Packages
