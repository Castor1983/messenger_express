import * as jwt from "jsonwebtoken";
import {IUser, IUserCredentials} from "../models/userModel";
import {passwordService} from "./password.service";
import {deleteField, getDoc, setDoc, doc, updateDoc} from "firebase/firestore";
import {firebase} from "../firebase";
import {ApiError} from "../errors/api.error";
import {ITokenPayload, IToken} from "../models/tokenModel";
import {tokenService} from "./token.service";
import {JwtPayload} from "jsonwebtoken";

class AuthService {
    public async register(dto: IUser): Promise<void> {
        try {
            const hashedPassword = await passwordService.hash(dto.password);
            const id = dto.phone
            const docRef = doc(firebase, 'users', dto.phone);
            await  setDoc(docRef ,{
                ...dto,
                password: hashedPassword,
            });
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
    public async login(dto: IUserCredentials): Promise<IToken> {
        try {
            const id = dto.phone;
            const data = doc(firebase, 'users', id);
            const docSnap = await getDoc(data);

            if (docSnap.exists()) {
                const user = docSnap.data();
                const isMatched = await passwordService.compare(
                    dto.password,
                    user.password
                );
                if (!isMatched) {
                    throw new ApiError("Invalid credentials provided", 401);
                }

                const token = tokenService.generateToken({
                    userId: user.phone
                });
                await tokenService.createToken({ ...token, userId: user.phone});

                return token;
            }
            else{
                throw new ApiError("Invalid credentials provided", 401);
            }
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
    public async logout(accessToken: string): Promise<void> {
        try {
            const payload = jwt.decode(accessToken)
            console.log(payload)
            const docRef = doc(firebase, 'tokensPair', "+389456743");
            await updateDoc(docRef, {
                accessToken: deleteField()
            });
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const authService = new AuthService();
