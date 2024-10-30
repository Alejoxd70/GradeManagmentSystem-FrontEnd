import { createContext, useEffect } from "react"
import UseAuth from "../hooks/UseAuth";


const StudentContext = createContext();

// eslint-disable-next-line react/prop-types
const StudentProvider = ({ children }) => {
    const { isAuthenticated, roleType, navigate, loading } = UseAuth();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated || roleType === "Profesor") {
                navigate("/");
            }
        }

    }, [isAuthenticated, roleType, navigate, loading]);

    if (loading) return "loading"

    return (
        <StudentContext.Provider 
            value={{
                loading,
            }}
        >
            {children}
        </StudentContext.Provider>
    )
}

export {
    StudentProvider,
}

export default StudentContext;