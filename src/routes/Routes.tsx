import { useContext } from "react"
import PrivateRoutes from "./private/PrivateRoutes"
import PublicRoutes from "./public/PublicRoutes"
import { AuthContext } from "../context/AuthContext"

export default function Routes() {
const {user} = useContext(AuthContext)
    return user ? <PrivateRoutes /> : <PublicRoutes />
}