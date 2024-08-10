import PrivateRoutes from "./private/PrivateRoutes"
import PublicRoutes from "./public/PublicRoutes"

export default function Routes() {


    const user = {
        name: "Mateus",
        email: "email@gmail.com",
        token: "",
    }

    return !user ? <PrivateRoutes /> : <PublicRoutes />
}