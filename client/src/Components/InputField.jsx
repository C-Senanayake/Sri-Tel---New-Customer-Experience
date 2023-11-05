function InputField({type,placeholder,name,value,onChange}){
    const handleChange = (event)=>{
        onChange(event.target.value,event.target.name);
    };
    return(
        <input className="rounded shadow shadow-gray-400 w-full h-9 p-2 mb-4" type={type} name={name} value={value} placeholder={placeholder} onChange={handleChange}/>
    )
}
export default InputField;