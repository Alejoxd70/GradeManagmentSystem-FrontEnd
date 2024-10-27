import { createContext, useEffect} from "react";
import UseAuth from "../hooks/UseAuth";

const AdminContext = createContext();


// eslint-disable-next-line react/prop-types
const AdminProvider = ({ children }) => {
    const {isAuthenticated, roleType, navigate, loading} = UseAuth();

    useEffect(() => {
        if(!loading) {
            if (!isAuthenticated || roleType !== "Administrador") {
                navigate("/");
            }
        }

    }, [isAuthenticated, roleType, navigate, loading]);

    if (loading) return "loading"




    return (
        <AdminContext.Provider>
            {children}
        </AdminContext.Provider>
    )
}
export {
    AdminProvider
}

export default AdminContext;