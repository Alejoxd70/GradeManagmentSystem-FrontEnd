import { useContext } from "react"
import StudentContext from "../context/StudentProvider"


const UseStudent = () => {
    return useContext(StudentContext);
}

export default UseStudent;