import { useState } from 'react';
import Input from '../components/input/input.component.jsx';
import SecunaAPI from '../secuna-api/SecunaAPI.js';
import { useNavigate } from 'react-router-dom';
import { setSession } from '../features/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

export default function SignIn(){
    const [showModal, setShowModal ] = useState(false);
    const [data, setData ] = useState({});
    const [user, setUser ] = useState({
        email : '',
        password : '',
    })
    const [code, setCode ] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token);

    const onSubmitClick = () => {
        SecunaAPI.signin(user)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setShowModal(true);
                setData(data);
                if(data.status === 'success'){
                    navigate('/signin');
                }
            })
    }

    const onCloseClick = () => {
        if(data.message === 'Registration successful.'){
            navigate('/signin');
        }
        setShowModal(false);
    }

    const onVerifyClick = () => {
        console.log(code);
        SecunaAPI.verify(data.access_token, { code : code})
            .then(response => response.json())
            .then(data => {
                dispatch(setSession({email: user.email, accessToken : data.access_token}));
                navigate('/home');
            })
    }

    const onChange = (event) => {
        setCode(event.target.value);
    }
    
    return(
          <div className='flex flex-col justify-center items-center w-screen h-screen bg-gray-300'>
            {
                showModal && (
                    <div className='fixed z-10'>
                        <div className='flex flex-col p-5 items-center justify-center bg-white pt-4 text-center sm:block min-h-0 rounded'>
                            <span className='font-bold'>Message</span>
                            <p className='p-5'>{data.message}</p>
                            <div className='w-full flex justify-center'>
                                <img src={data.two_fa_qr_url}/>
                            </div>
                            {
                                data.access_token && (
                                    <>
                                        <input type='text' onChange={onChange}  placeholder='enter 6-digit code' className='m-5 p-2'/>
                                        <button onClick={onVerifyClick}>Verify</button>
                                    </>
                                )
                            }

                            <button className='bg-red-400 text-white mx-2' onClick={onCloseClick}>close</button>
                        </div>
                    </div>
                    
                )
            }
            <div className='flex flex-col p-3 bg-white rounded'>
                <span className='text-xl self-center font-bold'>Signin</span>
                <Input placeholder='email' type='email' onChange={(e) => setUser({...user, email : e.target.value})}/>    
                <Input placeholder='password' type='password' onChange={e => setUser({...user, password : e.target.value})}/>    
                <button className='bg-gray-700 text-white mt-5' onClick={onSubmitClick}>Submit</button>    
            </div>
          </div>
    )
}
