import conf from "../conf/config.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { generateAccessAndRefreshToken } from "../controllers/user.controller.js";

const refreshAccessToken = async(incomingRefreshToken) => {
    if(!incomingRefreshToken){
        throw console.error("refresh token is required" , 401);
    }

    try {
        const decodeToken = jwt.verify(incomingRefreshToken, conf.refreshTokenSecret);

        const user = await User.findById(decodeToken?._id)
    
        if(!user){
            throw console.error("user not founf" , 401)
        }
    
        if(incomingRefreshToken !== user.refreshToken){
            throw console.error("invalid refresh token" , 401);
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);
    
        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        throw console.error("refresh token is required" , 401);
    }
}

export const verifyJWT = asyncHandler(async (req, res , next) => {
    try {
        let token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        const decodeToken = jwt.decode(token);

        const expirationTime = decodeToken?.exp * 1000; // Convert to milliseconds

        const currentTime = Date.now();
        
        if(!token || currentTime>=expirationTime){
            console.log("not token");
            const data = await refreshAccessToken(req.cookies?.refreshToken);
            if(data?.status === 401){
                throw new apiError(401, "unauthorized access");
            }

            const options = {
                httponly: true,
                secure: true,
                sameSite: 'None',
            }

            res.cookie("accessToken", data?.accessToken, options)
            .cookie("refreshToken", data?.refreshToken, options)
            
            token = data.accessToken;
        }
        
        const decodedToken = jwt.verify(token, conf.accessTokenSecret);
    
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        if(!user){
            throw new apiError(401, "invalid access token");
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.log('here error');
        console.log(error?.message);
        throw new apiError(401,`jwt error:  ${error?.message} `|| "invalid access token")
    }
});