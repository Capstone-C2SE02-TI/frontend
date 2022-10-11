import { useState, useEffect } from 'react';

function useDebounced(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handleDebouncedValue = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        
        return () => {
            clearTimeout(handleDebouncedValue)
        }
    })
    
    return debouncedValue
}

export default useDebounced