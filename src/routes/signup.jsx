import { useState } from 'react';
import Input from '../components/input/input.component.jsx';
import SecunaAPI from '../secuna-api/SecunaAPI.js';
import { useNavigate } from 'react-router-dom';


export default function SignUp(){
    const [showModal, setShowModal ] = useState(false);
    const [message, setMessage ] = useState('');
    const [user, setUser ] = useState({
        username : '',
        email : '',
        password : '',
        password_confirmation : ''
    })
    const navigate = useNavigate();
    const onSubmitClick = () => {

        console.log(user);
        SecunaAPI.signup(user)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setShowModal(true);
                setMessage(data.message);
                if(data.status === 'success'){
                    navigate('/signin');
                }
                
            })
    }

    const onCloseClick = () => {
        if(message === 'Registration successful.'){
            navigate('/signin');
        }
        setShowModal(false);
    }

    return(
          <div className='flex flex-col justify-center items-center w-screen h-screen bg-gray-300'>

            {
                showModal && (
                    <div className='fixed z-10'>
                        <div className='flex flex-col p-5 items-center justify-center bg-white pt-4 text-center sm:block sm:p-0 min-h-0 rounded'>
                            <span className='font-bold'>Message</span>
                            <p className='p-5'>{message}</p>
                            <button className='mb-5' onClick={onCloseClick}>close</button>
                        </div>
                    </div>
                    
                )
            }
            <div className='flex flex-col p-3 bg-white rounded'>


                <span className='text-xl self-center font-bold'>Signup</span>
                <Input placeholder='username' type='text' onChange={ (e) => setUser({...user, username : e.target.value}) }/>    
                <Input placeholder='email' type='email' onChange={(e) => setUser({...user, email : e.target.value})}/>    
                <Input placeholder='password' type='password' onChange={e => setUser({...user, password : e.target.value})}/>    
                <Input placeholder='confirm password' type='password' onChange={e => setUser({...user, password_confirmation : e.target.value})}/>    
                <button className='bg-gray-700 text-white mt-5' onClick={onSubmitClick}>Submit</button>    
            </div>
          </div>
    )
}
