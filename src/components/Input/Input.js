function Input({ className, onChange,value, placeholder, ref, type, ...props }) {
    return (
        <input
            onChange={onChange}
            value ={value}
            type={type}
            placeholder={placeholder}
            ref={ref}
            className={className}
            {...props}
        />
    );
}

export default Input;
