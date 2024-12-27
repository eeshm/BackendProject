import { Router } from "express"
import { loginUser, registerUser ,logoutUser,refreshAccessToken,changeCurrentPassword,
    getCurrentUser,updateAccountDetails ,updateUserAvatar,updateUserCoverImage} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"


const router = Router()

router.route("/register").post(
    upload.fields([             //upload is multer middleware and fields from multer
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

//Secured routes 

router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)  //Make to use patch instead of post to only get and update mentioned requests
router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/cover-image").patch(verifyJWT,upload.single("/coverImage"),updateUserCoverImage)

export default router

//Imported in app.js
