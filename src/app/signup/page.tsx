"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function SignupPage () {

    const router = useRouter();

    const [user, setUser] = useState({
        email : '',
        password : '',
        username : '',
    })

    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () =>{
       try {
        setLoading(true);
        const response = await axios.post("api/users/signup" , user);
        console.log("signup success " , response.data)
        router.push("/login");
       } 
       catch (error : any) {
        console.log("Signup Failed" , error.message)
          toast.error(error.message)
       } 
       finally{
           setLoading(false)
       }
    }
    


    useEffect(()=>{
        if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0 ){
            setIsButtonDisabled(false)
        }
        else{
            setIsButtonDisabled(true)
        }
    } , [user])



    return (
        <div className="flex w-full  flex-col min-h-screen justify-center items-center">
        <h1 className="text-2xl text-center">{loading ? "Processing" : "signup"}</h1>
        <input type="text" placeholder="username" value={user.username} onChange={(e) => setUser({...user , username: e.target.value})} className="h-[35px] w-[200px] border-[1px] border-indigo-800 my-[10px] placeholder:text-center"/>
        <input type="email" placeholder="email" value={user.email} onChange={(e) => setUser({...user , email: e.target.value})} className="h-[35px] w-[200px] border-[1px] border-indigo-800 my-[10px] placeholder:text-center"/>
        <input type="password" placeholder="password" value={user.password} onChange={(e) => setUser({...user , password: e.target.value})} className="h-[35px] w-[200px] border-[1px] border-indigo-800 my-[10px] placeholder:text-center"/>
        <button className="border-1 bg-red-600 text-[18px] h-[35px] my-[10px] w-[120px] text-white rounded-xl" onClick={onSignup}>{isButtonDisabled ? "no signup" : "signup"} </button>
        <Link href="/login"> Login here </Link>
    </div>
    )
}