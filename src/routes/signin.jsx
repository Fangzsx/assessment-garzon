import { useState } from 'react';
import Input from '../components/input/input.component.jsx';
import SecunaAPI from '../secuna-api/SecunaAPI.js';
import { useNavigate, NavLink } from 'react-router-dom';
import { setSession } from '../features/user/userSlice.js';
import { useDispatch } from 'react-redux';

export default function SignIn(){
    const [showModal, setShowModal ] = useState(false);
    const [data, setData ] = useState({});
    const [user, setUser ] = useState({
        email : '',
        password : '',
    })
    const [code, setCode ] = useState('');
    const [errors, setErrors ] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitClick = () => {
        SecunaAPI.signin(user)
            .then(response => response.json())
            .then(data => {
                setShowModal(true);
                setData(data);
                if(data.status === 'success'){
                    console.log('localStorage'. localStorage);
                    //navigate('/signin');
                }
                if(data.errors){
                    const errorArray = Object.values(data.errors);
                    setErrors(errorArray);
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
        SecunaAPI.verify(data.access_token, { code : code})
            .then(response => response.json())
            .then(data => {
                console.log('data',data);
                if(data.access_token){

                const userObject = { email : user.email, accessToken : data.access_token };
                dispatch(setSession(userObject));

                //save to localStorage
                localStorage.setItem('user', JSON.stringify(userObject));
                navigate('/home');
                }
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
                                {
                                    errors.length > 0 && errors.map(error => {
                                        return (
                                            <p>* {error}</p>
                                        )
                                    })
                                }
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

                            <button className='bg-red-400 text-white m-3' onClick={onCloseClick}>close</button>
                        </div>
                    </div>
                    
                )
            }
            <div className='flex flex-col justify-center items-center p-3 bg-white rounded'>
                <div className='w-full bg-gray-700 flex justify-center text-white mb-3 p-3 rounded'>
                    <span className='font-semibold'>Signin</span>
                </div>
                <Input placeholder='email' type='email' onChange={(e) => setUser({...user, email : e.target.value})}/>    
                <Input placeholder='password' type='password' onChange={e => setUser({...user, password : e.target.value})}/>    
                <button className='bg-gray-700 text-white mt-5 mb-5 w-full' onClick={onSubmitClick}>Submit</button>
                <NavLink className='m-3' to='/signup'>Doesn't have an account? Signup</NavLink>
            </div>
          </div>
    )
}
