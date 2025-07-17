import jwt from 'jsonwebtoken';

const authenticateToken=async(req,res,next)=>{
        try{
            console.log("Cookies:", req.cookies);

            const token=req.cookies.token
            if(!token){
                console.log(token)
                return res.status(401).json({success:false,message:'Token is not provided'})
            }

            const decoded=await jwt.verify(token,process.env.JWT_SECRET)

            if(!decoded){
                return res.status(401).json({success:false,message:'Token is not valid'})
            }
            // console.log(decoded)

            req.id=decoded.userId
            next()
        }
        catch(err){
            return res.status(401).json({message:'Token is not valid'})
        }
}

export default authenticateToken