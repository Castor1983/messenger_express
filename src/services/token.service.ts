import * as jwt from "jsonwebtoken";
import {configs} from "../configs/configs";
import {IToken, ITokenPayload, ITokenSchema} from "../types/tokenType";
import {ApiError} from "../errors/api.error";
import {doc, setDoc} from "firebase/firestore";
import {firebase} from "../firebase";

class TokenService {
    public generateToken(payload: ITokenPayload): IToken {
        const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
            expiresIn: "1h",
        });
        return {
            accessToken,
        };
    }

    public async createToken (dto: ITokenSchema):Promise<IToken> {
        try {
            const id = dto.userId;
            const docRef= doc(firebase, 'tokens', id);
            await setDoc(docRef, dto);

        }catch (e) {
            throw new ApiError(e.message, e.status);
        }
        return
    }

    public checkToken(token: string): ITokenPayload {
       const verifyToken = jwt.verify(token , configs.JWT_ACCESS_SECRET) as ITokenPayload;
       if (!verifyToken)
            {
            throw new ApiError("Token not valid!", 401);
        }
        return   verifyToken
    }
}
export const tokenService = new TokenService();
