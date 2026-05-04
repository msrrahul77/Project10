
import bcrypt from 'bcrypt';
import { Auth } from '../model/auth.model.js';

import jwt from 'jsonwebtoken';

import { Session } from '../model/session.model.js';
import {User} from '../../User/user.model.js'
// const registerUser = async (req, res) => {
//     	const saltRounds = 10;

//     try {
//         const { email, passwordHash,...remainingFields } = req.body
//         console.log('Remaining Fields',remainingFields)
//         if (!email || !passwordHash) {
//                 return res.status(400).json({
//                 message:"Please Enter All Fields"
//             })
//         }

//      const isUserExists = await User.findOne({
//     email,
//     tenantId: remainingFields.tenantId
// });
// console.log("IsUserExisrs",isUserExists)
//         if (isUserExists) {
//             return res.status(400).json({
//                 message:"Email Exists..Please Enter New One"
//             })
//         }

//         const hashedPassword =await bcrypt.hash(password, saltRounds)

//         const newUser = await User.create({

// 			email,
//             passwordHash: hashedPassword,
//             ...remainingFields
//         });
// // 	const token = await jwt.sign({ id: newUser._id }, "secret");
// // 		console.log('TOKEN', token);
// // newUser.token=token

//         // return res.status(200).json({
// 		// 	message: 'User Created',
// 		// 	success: true,
//         //     data: newUser,



// 		// });
//         // if (email) {
//         //     return res.status(400).json({
//         //         message:"Email Exists..Please Enter New"
//         //     })
//         // }
//         const userResponse = await User.findById(newUser._id); // excludes passwordHash

// return res.status(200).json({
//     message: 'User Created',
//     success: true,
//     data: userResponse
// });

//     } catch (error) {


//         return res.status(400).json({
// 			message: "Error From here",

// 			success: false,

// 		});
// }

// }
const registerUser = async (req, res) => {
    const saltRounds = 10;

    try {
        const { email, passwordHash, tenantId, firstName, lastName, role, ...remainingFields } = req.body;

        if (!email || !passwordHash || !tenantId || !firstName || !lastName || !role) {
            return res.status(400).json({
                message: "Required fields missing"
            });
        }

        const isUserExists = await User.findOne({ email, tenantId });

        if (isUserExists) {
            return res.status(400).json({
                message: "Email already exists for this tenant"
            });
        }

        // const hashedPassword = await bcrypt.hash(passwordHash, saltRounds);

        const newUser = await User.create({
            email,
            passwordHash,
            tenantId,
            firstName,
            lastName,
            role,
            ...remainingFields
        });

        const userResponse = await User.findById(newUser._id);
console.log("UserResponse",userResponse)
        return res.status(201).json({
            message: 'User Created',
            success: true,
            data: newUser,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};
const loginUser = async(req,res) => {

    try {
        const { email, passwordHash } = req.body
        if (!email || !passwordHash) {
            return res.status(400).json({
                success:false,
                message:"All Fields are Required"
            })

        }
        const user = await User.findOne({ email })

        console.log("User From Login",user)
        if (!user) {
            res.status(400).json({
                success:false,
                message:"Unauthorized Access"
            })
        }
        // const passwordCheck = await bcrypt.compare(passwordHash, user.password)
        // if (!passwordCheck) {
        //     res.status(400).json({
        //         success:false,
        //         message:"Password Wrong"
        //     })
        // }
        //Todo check for verified later
        // if()

        //check for existing session
        // const existingSession = await Session.findOne({
        //     userId: user._id
        // })

        // console.log("Existing Session", existingSession)
        // if (existingSession) {
        //     await Session.deleteOne({userId:user._id})
        // }
        //create a new session
        await Session.create({ userId: user._id })
console.log("UserId",user)
        const accessToken=jwt.sign({id:user},"secret",{expiresIn:"1d"})
        console.log("Access Token", accessToken)
        // const refreshToken = jwt.sign({ id: user._id },"secret",expiresIn:"1d"})
        const refreshToken = jwt.sign({ id: user._id }, "secret", { expiresIn: "30d" })


         user.isLoggedIn = true
          await user.save()
        res.status(200).json({
            success:"true",
            message: `${user.email} is Logged In`,
            accessToken:accessToken,
            refreshToken:refreshToken,
            user:user.email

        })


        console.log("RefreshToken", refreshToken)


    } catch (error) {

  res.status(400).json({
                success:false,
                message:error.message
            })
    }

}


export const AuthController = { registerUser,loginUser}