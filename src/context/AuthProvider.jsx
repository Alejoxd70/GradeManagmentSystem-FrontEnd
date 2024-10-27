import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)
    const [roleType, setRoleType] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const savedAuth = localStorage.getItem("auth");
        console.log(savedAuth);
        
        if (savedAuth) {
            const authData = JSON.parse(savedAuth);
            console.log(authData);
            
            setAuth(authData);
            setIsAuthenticated(true);
            setRoleType(authData.userType.userTypeName);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
    }, []);
    
    const authLogin = (authData) => {
        localStorage.setItem("auth", JSON.stringify(authData));
        setAuth(authData);
        setIsAuthenticated(true);
        setRoleType(authData.userType.userTypeName);
    };
    
    const logOut = () => {
        localStorage.removeItem("auth");
        setIsAuthenticated(false);
        setRoleType(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                logOut,
                isAuthenticated,
                roleType,
                navigate,
                loading,
                authLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}

export default AuthContext;