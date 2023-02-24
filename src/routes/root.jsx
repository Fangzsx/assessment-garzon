import { Outlet, NavLink } from 'react-router-dom';

export default function Root(){
    return(
        <div className='flex justify-center items-center w-screen h-screen bg-gray-200'>
            <NavLink to='/signup'>
                Signup
            </NavLink>
            
            <NavLink className='mx-5' to='/signin'>
                Signin
            </NavLink>

        </div>
    )
}
