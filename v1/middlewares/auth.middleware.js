
import jwt  from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    console.log(req.headers)
    const token = req.headers.authorization;
    const tokenWithBearer=token.startsWith("Bearer")
    if (token) {
        // token = authHeaders.split("")[1]
        console.log(token)

        if (!token) {
            return res.status(400).json("No Token")
        }
        try {
            const decoded = jwt.verify(token, 'secret')
            console.log('Decoded', decoded)
            req.user = decoded
            console.log(req.user)


        } catch (error) {
            console.log(error,"Token Invalid")
        }
    }

}