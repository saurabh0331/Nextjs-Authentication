import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse , NextRequest } from "next/server";
import User from "@/models/useModel";
import { connect } from "@/dbConfig/dbconfig";

connect();

export  async function GET(request : NextRequest){
    try {
        const userId = await getDataFromToken(request);
    const user =  await User.findOne({_id : userId}).select("-password")
    return NextResponse.json({
        message : "Users Information found",
        data : user,
    })
    } catch (error : any) {
       return NextResponse.json({error : error.message} , {status : 400})
    }
    
}