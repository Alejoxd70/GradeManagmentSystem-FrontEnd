import { createContext, useEffect } from "react"
import UseAuth from "../hooks/UseAuth";

const TeacherContext = createContext();

// eslint-disable-next-line react/prop-types
const TeacherProvider = ({children}) => {
    const {isAuthenticated, roleType, navigate, loading} = UseAuth();

    useEffect(() => {
        if(!loading) {
            if (!isAuthenticated || roleType === "Estudiante") {
                navigate("/")
            }
        }

    }, [isAuthenticated, roleType, navigate, loading]);

    if (loading) return "loading"


    return (
        <TeacherContext.Provider>
            {children}
        </TeacherContext.Provider>
    )
}
export {
    TeacherProvider
}

export default TeacherContext;