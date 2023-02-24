import { Outlet, NavLink } from 'react-router-dom';

export default function Root(){

    return(
        <div className='flex justify-center items-center w-screen h-screen bg-gray-200'>

            <div className='flex flex-col w-1/3 bg-white rounded'>
                <div className='flex flex-row justify-center w-full bg-gray-700 text-white p-5 rounded'>
                    <span className='font-bold'>Welcome!</span>
                </div>

                <div className='flex flex-row justify-center items-center p-5'>
                    <NavLink to='/signup'>
                        <button>Signup</button>
                    </NavLink>
                    <NavLink className='mx-3' to='/signin'>
                        <button>Signin</button>
                    </NavLink>
                </div>


            </div>



        </div>
    )
}
