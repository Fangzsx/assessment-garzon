export default function Input({placeholder, type, object, field, onChange}){

    return(
        <input 
            className='p-2' 
            placeholder={placeholder}
            onChange={onChange}
            type={type}/>
    )
}
