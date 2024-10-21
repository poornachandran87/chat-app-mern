import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';


const useLogut = () => {
    const [loading,setLoading] =useState(false);
    const { setAuthUser }= useAuthContext()
    const logout = async () => {
        
        setLoading(true);

        try {
            const res = await fetch("/api/auth/logout",{
                method: "POST",
                headers: {"Content-Type":"application/json"}
            })

            const data = await res.json()
            if(data.Error){
                throw new Error(data.Error)
            }

            localStorage.removeItem('chat-user',JSON.stringify(data))
            setAuthUser(null)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading,logout}
}

export default useLogut;