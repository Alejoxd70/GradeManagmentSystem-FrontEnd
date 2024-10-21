import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import "./index.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';

import ForgotPassword from './pages/ForgotPassword';
import LoginLayout from './layout/LoginLayout';
import Group from './pages/Admin/Group';
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
import GradeForm from './pages/Admin/GradeForm';
import SubjectForm from './pages/Admin/SubjectForm';
import SubjectTeacherForm from './pages/Admin/SubjectTeacherForm';
import GroupForm from './pages/Admin/GroupForm';
import RegisterStudentForm from './pages/Admin/RegisterStudentForm';
import AssignmentsForm from './pages/Admin/AssignmentsForm';


function App() {
    


    return (
        <>
            <BrowserRouter>
                <Routes>

                    <Route path='/' element={<LoginLayout/>}>
                        <Route index element={<Login/>}/>
                        <Route path='forgot-password' element={<ForgotPassword/>}/>
                    </Route>

                    <Route path="/admin" element={<AdminLayout/>} >
                        {/* User */}
                        <Route path='/admin/users' element={<User/>}/>
                        <Route path='/admin/users/create' element={<UserForm/>}/>
                        <Route path='/admin/users/edit/:id' element={<UserForm/>}/>

                        <Route path='/admin/groups' element={<Group/>}/>
                        <Route path='/admin/groups/create' element={<GroupForm/>}/>
                        <Route path='/admin/groups/edit/:id' element={<GroupForm/>}/>

                        <Route path='/admin/groupYears' element={<RegisterStudent/>}/>
                        <Route path='/admin/groupYears/create' element={<RegisterStudentForm/>}/>
                        <Route path='/admin/groupYears/edit/:id' element={<RegisterStudentForm/>}/>

                        {/*subjects*/}
                        <Route path='/admin/Subject' element={<Subject/>}/>
                        <Route path='/admin/Subject/create' element={<SubjectForm/>}/>
                        <Route path='/admin/Subject/edit/:id' element={<SubjectForm/>}/>

                        
                        <Route path='/admin/register-teachers' element={<RegisterTeacher/>}/>
                        
                        <Route path='/admin/assignments' element={<Assignments/>}/>
                        <Route path='/admin/assignments/create' element={<AssignmentsForm/>}/>
                        <Route path='/admin/assignments/edit/:id' element={<AssignmentsForm/>}/>

                        <Route path='/admin/grades' element={<Grade/>}/>

                        {/*subjectteachers*/}
                        <Route path='/admin/RegisterTeacher' element={<RegisterTeacher/>}/>
                        <Route path='/admin/RegisterTeacher/create' element={<SubjectTeacherForm/>}/>
                        <Route path='/admin/RegisterTeacher/edit/:id' element={<SubjectTeacherForm/>}/>


                        <Route path='/admin/assignments' element={<Assignments/>}/>
                        {/*grades*/}
                        <Route path='/admin/Grade' element={<Grade/>}/>
                        <Route path='/admin/Grade/create' element={<GradeForm/>}/>
                        <Route path='/admin/Grade/edit/:id' element={<GradeForm/>}/>



                        <Route path='/admin/profile' element={<Profile/>} />
                    </Route>
                    
                </Routes>
                <Footer/>

            </BrowserRouter>
        </>
    )
}

export default App
