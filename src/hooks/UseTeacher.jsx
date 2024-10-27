import { useContext } from "react"
import TeacherContext from "../context/TeacherProvider"


const UseTeacher = () => {
    return useContext(TeacherContext);
}

export default UseTeacher;