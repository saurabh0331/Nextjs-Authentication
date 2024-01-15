import { NextRequest , NextResponse } from "next/server";
import User from "@/models/useModel";
import { connect } from "@/dbConfig/dbconfig";


 connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token)
    
        const user = await User.findOne({verifyToken : token ,  verifyTokenExpiry : {$gt : Date.now()}})

        if(!user){
            return NextResponse.json({error : "Invalid Token"} , {status : 500})
        }

       user.isVerified  = true;
       user.verifyToken = undefined ;
       user.verifyTokenExpiry = undefined;
       await user.save()


        return NextResponse.json({
            message : "User Verified Succesfully",
            success : true
        })

    } catch (error : any) {
         return NextResponse.json({error : error.message} , {status : 500})
    }
   

} 