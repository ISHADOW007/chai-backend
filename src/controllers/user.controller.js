import { asyncHandler } from "../utils/asyncHandler.js"
console.log("shivam")
const registerUser= asyncHandler(async(req,res)=>{
    console.log("debug")
    res.status(200).json({
        message:"ok",
        satyam:"hii"
    })
})


export {registerUser}