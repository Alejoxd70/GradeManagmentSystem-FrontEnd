import { createContext, useEffect, useState} from "react";
import UseAuth from "../hooks/UseAuth";
import axiosClient from "../config/axios";

const AdminContext = createContext();


// eslint-disable-next-line react/prop-types
const AdminProvider = ({ children }) => {
    const {isAuthenticated, roleType, navigate, loading} = UseAuth();
    const [users, setUsers] = useState([]);
    const [userTypes, setUserTypes] = useState([]);
    const [loadingFetch, setLoadingFetch] = useState(true);

    useEffect(() => {
        if(!loading) {
            if (!isAuthenticated || roleType !== "Administrador") {
                navigate("/");
            }
        }

    }, [isAuthenticated, roleType, navigate, loading]);

    // useEffect solo se llama una vez cuando renderizamos
    useEffect(() => {
        // LLama la funcion getUsers
        getUsers();
        getUserTypes();
        setLoadingFetch(false);
    }, [setUsers]);

    // Busca los registros en la base de datos de Users
    const getUsers = async () => {
        try {
            const { data } = await axiosClient.get("/Users")
            console.log(data);
            setUsers(data)
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch user by id
    const getUser = async id => {
        try {
            const { data } = await axiosClient.get(`/Users/${id}`);
            const renewData = {
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                password: "",
                identification: data.identification,
                userTypeId: data.userType.id,
            }
            
            return (renewData);

        } catch (error) {
            console.log(error);
            
        }
    }
    // Create User
    const createUser = async formData => {
        try {
            const queryString = new URLSearchParams(formData).toString();
            const url = `/Users?${queryString}`
            const { data } = await axiosClient.post(url);
            getUsers();
            return data;
        } catch (error) {
            console.log(error);
            
        }
    }

    // upate User
    const updateUser = async (id, formData) => {
        try {
            if (!formData.password) {
                delete formData.password;
            }
            const queryString = new URLSearchParams(formData).toString();
            const url = `/Users/${id}?${queryString}`

            const { data } = await axiosClient.put(url)
            getUsers();
            console.log(data);
            
            return data;
        } catch (error) {
            console.log(error);
            
        }
    }

    // Fetch userTypes
    const getUserTypes = async () => {
        try {
            const { data } = await axiosClient.get("/UserTypes");
            setUserTypes(data);
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }








    if (loading) return "loading"




    return (
        <AdminContext.Provider 
            value={{
                users,
                userTypes,
                loadingFetch,
                getUsers,
                getUser,
                createUser,
                updateUser,
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}
export {
    AdminProvider
}

export default AdminContext;