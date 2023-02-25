import Input from '../components/input/input.component.jsx';
import Report from '../components/report/report.component.jsx';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SecunaAPI from '../secuna-api/SecunaAPI.js';
import { useNavigate } from 'react-router-dom';
import SignIn from './signin.jsx';

export default function Home(){
    const user = useSelector(state => state.user.value);
    const navigate = useNavigate();
    const [ showModal, setShowModal ] = useState(false);
    const [ report, setReport ] = useState({
        vulnerability_type : '',
        title : '',
        description : ''
    });
    const [ message, setMessage ] = useState('');
    const [ reports, setReports ] = useState([]);
    const [ errors, setErrors ] = useState([]);

    const storageUser = JSON.parse(localStorage.getItem('user'));

    const onRetrieveReportClick = () => {
        SecunaAPI.getReports(user.accessToken || storageUser.accessToken)
            .then(response => response.json())
            .then(data => {
                setReports(data.reports);
            })
    }

    const onSubmitClick = (event) => {
        setShowModal(true);
        event.preventDefault();
        SecunaAPI.submitReport(user.accessToken || storageUser.accessToken, report)
            .then(response => response.json())
            .then(data => {
                setMessage(data.message);
                setReport({
                    vulnerability_type : '',
                    severity_level : '',
                    title : '',
                    description : ''
                })
                if(data.reports){
                    setReports(data.reports);
                }
                if(data.errors){
                    const errorArray = Object.values(data.errors);
                    setErrors(errorArray);
                }
            })
    }

    const onDeleteClick = (index) => {
        const toDelete = reports[index];
        SecunaAPI.deleteReport(user.accessToken || storageUser.accessToken, toDelete.uuid)
            .then(response => response.json())
            .then(data => {
                setReports(data.reports);
            })
    }

    const onCloseClick = () => {
        setShowModal(false);
        setErrors([]);
    }

    const onSignOutClick = () => {
        localStorage.clear();
        navigate('/signin');
    }

    if (Object.keys(user).length === 0 && !storageUser) {
         return <SignIn />
    }

    return(
        <div className='w-screen h-screen bg-gray-200'>
            <div className='flex flex-row h-screen'>
                <div className='w-1/3 flex flex-col p-5 max-h-screen overflow-y-auto'>
                    <span className='font-bold mb-3'>Signed in as: { user.email || storageUser.email}</span>
                    <button className='self-start bg-gray-700 text-white' onClick={onRetrieveReportClick}>retrieve reports</button>
                    {
                        reports && reports.map( (report, index) => {
                            return(
                                <Report report={report} onClick={() => onDeleteClick(index)}/>
                            )
                        })
                    }
                </div>
                <div className='bg-gray-100 w-2/3 flex flex-col justify-center items-center'>
                    <button className='bg-red-400 text-white m-10 self-end' onClick={onSignOutClick}>signout</button>
                    {
                        showModal && (
                            <div className='fixed z-10'>
                                <div className='flex flex-col p-5 items-center justify-center bg-white border pt-4 text-center sm:block min-h-0 rounded'>
                                    <span className='font-bold'>Message</span>
                                    <p className='p-5'>{message}</p>
                                        {
                                            errors.length > 0 && errors.map(error => {
                                                return (
                                                    <p className='text-red-500'>* {error}</p>
                                                )
                                            })
                                        }
                                    <button className='bg-red-400 text-white m-3' onClick={onCloseClick}>close</button>
                                </div>
                            </div>
                            
                        )
                    }
                      <div className='bg-white flex flex-col w-2/3 rounded p-5'>
                            <span className='font-bold mb-3'>Create Report</span>
                            <Input placeholder='vulnerability type' value={report.vulnerability_type} onChange={(e) => setReport({...report, vulnerability_type : e.target.value})}/>
                            <select className='p-2 bg-white mb-3' defaultValue='' onChange={(e) => setReport({...report, severity_level : e.target.value})}>
                                <option value="" disabled>select severity level</option>
                                <option value='High'>high</option>
                                <option value='Medium'>medium</option>
                                <option value='Low'>low</option>
                            </select>
                            <Input placeholder='title' value={report.title} onChange={(e) => setReport({...report, title : e.target.value})}/>
                            <Input placeholder='description' value={report.description} onChange={(e) => setReport({...report, description : e.target.value})}/>
                            <button type='submit' className='bg-gray-700 text-white' onClick={onSubmitClick} >submit</button>
                      </div>
                </div>
            </div>
        </div>
    )
}
