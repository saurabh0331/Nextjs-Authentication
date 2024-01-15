"use client";
import Link from "next/link";
import React, {useEffect , useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Router } from "next/router";

export default function LoginPage () {
    const [user, setUser] = useState({
        email : '',
        password : '',
        
    })

    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const onSignup = async () =>{
      try {
        setLoading(true)
        const response = await axios.post("/api/users/login" , user)
        console.log("logged in successfully" , response.data)
        toast.success("Login success")
        router.push("/profile")
      } 

      catch (error : any) {
        console.log("Login failed", error.message);
            toast.error(error.message);
      }
      
      finally{
         setLoading(false)
      }
    }
     
    useEffect(()=>{
       if(user.email.length > 0 && user.password.length > 0){
        setIsButtonDisabled(false)
       }
       else{
        setIsButtonDisabled(true)
       }
    } , [user])


    return (
        <div className="flex w-full  flex-col min-h-screen justify-center items-center">
        <h1 className="text-2xl text-center">{loading ? "processing" : "Login"}</h1>
        
        <input type="email" placeholder="email" value={user.email} onChange={(e) => setUser({...user , email: e.target.value})} className="h-[35px] w-[200px] border-[1px] border-indigo-800 my-[10px] placeholder:text-center"/>
        <input type="password" placeholder="password" value={user.password} onChange={(e) => setUser({...user , password: e.target.value})} className="h-[35px] w-[200px] border-[1px] border-indigo-800 my-[10px] placeholder:text-center"/>
        <button className="border-1 bg-red-600 text-[18px] h-[35px] my-[10px] w-[120px] text-white rounded-xl" onClick={onSignup}>{isButtonDisabled ? "No Login" : "Login "}</button>
        <Link href="/signup"> Signup here </Link>
    </div>
    )
    
    
}