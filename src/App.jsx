import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import "./index.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';

import ForgotPassword from './pages/ForgotPassword';
import LoginLayout from './layout/LoginLayout';
import Courses from './pages/Admin/Group';
import AdminLayout from './layout/AdminLayout';
import Footer from './components/Footer';
import Assignments from "./pages/Admin/Assignments"
import RegisterStudent from "./pages/Admin/RegisterStudent"
import RegisterTeacher from "./pages/Admin/RegisterTeacher"
import Subject from "./pages/Admin/Subject"
import Grade from "./pages/Admin/Grade"
import User from './pages/Admin/User';
import Profile from './pages/Admin/Profile';
import UserForm from './pages/Admin/UserForm';
import StudentLayout from './layout/StudentLayout';
import StudentGroup from './pages/student/StudentGroup.jsx';
import TeacherLayout from './layout/TeacherLayout.jsx';
import TeacherGroup from './pages/teacher/TeacherGroup.jsx';

function App() {
    


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginLayout/>}>
                        <Route index element={<Login/>}/>
                        <Route path='forgot-password' element={<ForgotPassword/>}/>
                    </Route>

                    {/* ADMIN ROUTES */}
                    <Route path="/admin" element={<AdminLayout/>} >
                        {/* User */}
                        <Route path='/admin/users' element={<User/>}/>
                        <Route path='/admin/users/create' element={<UserForm/>}/>
                        <Route path='/admin/users/edit/:id' element={<UserForm/>}/>

                        <Route path='/admin/courses' element={<Courses/>}/>
                        <Route path='/admin/register-students' element={<RegisterStudent/>}/>
                        <Route path='/admin/subjects' element={<Subject/>}/>
                        <Route path='/admin/register-teachers' element={<RegisterTeacher/>}/>
                        <Route path='/admin/assignments' element={<Assignments/>}/>
                        <Route path='/admin/grades' element={<Grade/>}/>
                        <Route path='/admin/profile' element={<Profile/>} />
                    </Route>

                    {/* STUDENT ROUTES */}
                    <Route path='/student' element={<StudentLayout/>}>
                        <Route path='/student/groups' element={<StudentGroup/>}/>
                    </Route>

                    {/* TEACHER ROUTES */}
                    <Route path='/teacher' element={<TeacherLayout/>}>
                        <Route path='/teacher/groups' element={<TeacherGroup/>}/>
                    </Route>
                    
                </Routes>
                <Footer/>

            </BrowserRouter>
        </>
    )
}

export default App
