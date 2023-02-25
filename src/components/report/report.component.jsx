export default function Report({report, onClick}){
    return(
        <div className='bg-white flex flex-col bg-gray-200 w-full my-3 p-2 rounded'>
            <span>uuid: {report.uuid}</span>
            <span>vulnerability type: {report.vulnerability_type}</span>
            <span>severity level: {report.severity_level}</span>
            <span>title: {report.title}</span>
            <span>description: {report.description}</span>
            <button onClick={onClick} className='bg-red-400 text-white m-3'>delete</button>
        </div>
    )
}
