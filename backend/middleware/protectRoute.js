import jwt  from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async(req,res,next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({Error: "Unauthorized - No Token Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({Error: "Unauthorized - Invalid Token "})
        }

        const user = await User.findById(decoded.userID).select("-password")

        if(!user){
            return res.status(404).json({Error: "User not found "})
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("error in protectRoute middleware",error.message);
        res.status(500).json({Error:"Internal server error"})
    }
}

export default protectRoute;