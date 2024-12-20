import {getDoc, setDoc, doc, deleteDoc} from "firebase/firestore";
import {firebase} from "../firebase";

import {IUser, IUserCredentials} from "../types/userType";
import {passwordService} from "./password.service";
import {ApiError} from "../errors/api.error";
import {IToken} from "../types/tokenType";
import {tokenService} from "./token.service";

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
            const payload = tokenService.checkToken(accessToken)
            const docRef = doc(firebase, 'tokens', payload.userId);
            await deleteDoc(docRef);
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const authService = new AuthService();
