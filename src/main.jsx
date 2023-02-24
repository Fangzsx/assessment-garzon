import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Main from './routes/root.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './routes/signup.jsx';
import SignIn from './routes/signin.jsx';
import Home from './routes/home.jsx';
import { Provider } from 'react-redux';
import store from './app/store.js';

const router = createBrowserRouter([
    {
        path : '/',
        element : <Main />,
    },
    {
        path : '/signup',
        element : <SignUp />,
    },
    {
        path : '/signin',
        element : <SignIn />,
    },
    {
        path : '/home',
        element : <Home />,
    },

])


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
        <React.StrictMode>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>

        </React.StrictMode>

)
