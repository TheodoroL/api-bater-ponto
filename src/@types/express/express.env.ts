import { TokenPayload } from "../../util/jwt/jwt"

declare global {
    namespace Express {
        interface Request {
            user: TokenPayload
        }
    }
}
export { }