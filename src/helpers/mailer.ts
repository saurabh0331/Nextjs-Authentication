import nodemailer from 'nodemailer';
import User from '@/models/useModel';
import bcryptjs from 'bcryptjs';


export async function sendEmail ({email , emailType , userId} : any){

    try {
        const hashedToken = await bcryptjs.hash(userId.toString() , 10);

     if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId , {
            verifyToken : hashedToken , verifyTokenExpiry : Date.now() + 36000000
        })
     }

     else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId , 
            {forgotPasswordToken : hashedToken , forgotPasswordTokenExpiry : Date.now() + 3600000}
            )
     }


     var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "dfc4f9c68f053c",
          pass: "968f7b6b466174"
        }
      });

    const mailOptions = {
        from : "saurabhpatil@gmail.com",
        to : email,
        subject : emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
        html : `<p>click <a href="${process.env.DOMAIN}verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your password"} or copy the link below in your browser <br/>
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
    }

    const mailresponse = await transport.sendMail(mailOptions);
    return mailOptions;

    
    } catch (error : any) {
        throw new Error (error.message)
    }
     

}
