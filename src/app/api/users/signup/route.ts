import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/useModel"
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect()

  



export async function POST(request : NextRequest){
   try {
      const reqbody = await request.json()
       const {username , email , password } = reqbody;
       console.log(reqbody)

    //    check if user already exists
      
    const user = await User.findOne({email})

    if(user){
        return NextResponse.json({error : "User Already Exits" }, {status : 400})
    }

       // hash password 
     
       const salt = await bcryptjs.genSalt(10)
       const hashedpassword = await bcryptjs.hash(password , salt)
        
       const newuser = new User ({
        username , 
        email ,
        password :  hashedpassword
       })

       const saveduser = await newuser.save()
       console.log(saveduser)

       await sendEmail({email, emailType: "VERIFY", userId: saveduser._id})

      return NextResponse.json({
        message : "user created succesfully",
        success : true,
        saveduser
      })


   } catch (error : any) {
      return NextResponse.json({error : error.message} , {status : 500})
   }
} 