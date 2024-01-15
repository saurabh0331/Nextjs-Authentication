"use client"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"
import Link from "next/link"
export default function Profile (){

  const [data, setData] = useState("nothing")
     
  const router = useRouter()

   const Logout = async () =>{
    try {
        await axios.get("/api/users/logout")
       toast.success("logged out succesfully")
       router.push("/login")
    } catch (error : any) {
         console.log(error.message)
         toast.error(error.message)
    }
}

  const getUserDetails = async()=>{
    try {
        const res = await axios.get("/api/users/me")
        console.log(res.data)
        setData(res.data.data._id)
    } catch (error : any) {
        console.log(error.message)
    }
  
  }
   

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen ">
            <h1>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>
                  {data}
                </Link>}</h1>
            <h1 className="text-4xl ">profile</h1>
            <button className="h-[35px] w-[150px] mt-[20px] rounded-xl bg-indigo-500 text-white" onClick={Logout}>
                Logout
            </button>
            
            <button className="h-[35px] w-[150px] rounded-xl mt-[50px] bg-indigo-500 text-white" onClick={getUserDetails}>
                User details
            </button>
        </div>
    )
}