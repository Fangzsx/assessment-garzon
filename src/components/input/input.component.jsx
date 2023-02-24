export default function Input({placeholder, type, object, field, onChange, value}){

    return(
        <input 
            className='p-2 mb-3' 
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            type={type}/>
    )
}
