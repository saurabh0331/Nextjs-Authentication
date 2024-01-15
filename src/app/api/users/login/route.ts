import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/useModel"
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
connect()


export async function POST(request : NextRequest){
     try {
        const reqBody = await request.json()
        const {email , password} = reqBody

        // if user already exists

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error : "User Doesn't Exits"} , {status : 500})
        }

        console.log("user exists")


        // check if password is correct

        const validatepassword = await bcryptjs.compare(password , user.password)
         if(!validatepassword){
            return Response.json({error : "password is incorrect"} , {status : 500})
         }

        //  create a token data 
        const tokendata = {
            id : user._id,
            email : user.email,
            username : user.username
        }

        // create a jwt token

        const token = await jwt.sign( tokendata  , process.env.TOKEN_SECRET! , {expiresIn : "1d"})

        
        const response =  NextResponse.json({
            message : "logged in succesfully",
            success : true

        })

        response.cookies.set("token" , token , {
            httpOnly : true
        })

        return response;

    



     }catch (error : any) {
         return NextResponse.json({error : error.message} , {status : 500})
    
} }