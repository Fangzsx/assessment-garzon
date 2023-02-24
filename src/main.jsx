import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Main from './routes/root.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './routes/signup.jsx';
import SignIn from './routes/signin.jsx';

const router = createBrowserRouter([
    {
        path : '/',
        element : <Main />,
    },
    {
        path : '/signup',
        element : <SignUp />
    },
    {
        path : '/signin',
        element : <SignIn />
    }

])


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>

)
