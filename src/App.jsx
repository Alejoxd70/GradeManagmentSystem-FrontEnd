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
import StudentLayout from './layout/StudentLayout';
import StudentGroup from './pages/student/StudentGroup.jsx';
import Report from './pages/student/Report.jsx';
import TeacherLayout from './layout/TeacherLayout.jsx';
import TeacherGroup from './pages/teacher/TeacherGroup.jsx';
import GradeForm from './pages/Admin/GradeForm';
import SubjectForm from './pages/Admin/SubjectForm';
import SubjectTeacherForm from './pages/Admin/SubjectTeacherForm';
import GroupForm from './pages/Admin/GroupForm';
import RegisterStudentForm from './pages/Admin/RegisterStudentForm';
import AssignmentsForm from './pages/Admin/AssignmentsForm';
import ListStudents from './pages/teacher/ListStudents.jsx';
import ListAssigments from './pages/teacher/listAssignments.jsx';
import FormAssignmentTeacher from './pages/teacher/FormAssignmentTeacher.jsx';
import TeacherGrade from './pages/teacher/TeacherGrade.jsx';
import TeacherGradeForm from './pages/teacher/TeacherGradeForm.jsx';

import StudentProfile from './pages/student/StudentProfile.jsx';

import SubjectStudent from './pages/student/SubjectStudent';
import AssigmentStudent from './pages/student/AssigmentStudent';
import Teacher from './pages/teacher/Teacher.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import { AdminProvider } from './context/AdminProvider.jsx';
import { TeacherProvider } from './context/TeacherProvider.jsx';
import { StudentProvider } from './context/StudentProvider.jsx';




function App() {
    
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path='/' element={<LoginLayout/>}>
                            <Route index element={<Login/>}/>
                            <Route path='forgot-password' element={<ForgotPassword/>}/>
                        </Route>

                        {/* ADMIN ROUTES */}
                        <Route path="/admin" element={
                                <AdminProvider>
                                    <AdminLayout/>
                                </AdminProvider>
                                
                        } >
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

                
                            
                            <Route path='/admin/assignments' element={<Assignments/>}/>
                            <Route path='/admin/assignments/create' element={<AssignmentsForm/>}/>
                            <Route path='/admin/assignments/edit/:id' element={<AssignmentsForm/>}/>


                            {/*subjectteachers*/}
                            <Route path='/admin/RegisterTeacher' element={<RegisterTeacher/>}/>
                            <Route path='/admin/RegisterTeacher/create' element={<SubjectTeacherForm/>}/>
                            <Route path='/admin/RegisterTeacher/edit/:id' element={<SubjectTeacherForm/>}/>

                    
                            {/*grades*/}
                            <Route path='/admin/Grade' element={<Grade/>}/>
                            <Route path='/admin/Grade/create' element={<GradeForm/>}/>
                            <Route path='/admin/Grade/edit/:id' element={<GradeForm/>}/>

                            <Route path='/admin/profile' element={<Profile/>} />
                        </Route>

                        {/* STUDENT ROUTES */}
                        <Route path='/student' element={
                            <StudentProvider>
                                <StudentLayout/>
                            </StudentProvider>
                        }>
                            <Route path='/student/groups' element={<StudentGroup/>}/>
                            <Route path='/student/profile' element={<Profile/>}/>
                            <Route path='/student/reports' element={<Report/>}/>
                            <Route path='/student/profile' element={<StudentProfile/>}/>
                            {/*subjectstudent*/}
                            <Route path='/student/subjects' element={<SubjectStudent/>}/>
                            {/*assigmentstudent*/}
                            <Route path='/student/assignments/' element={<AssigmentStudent/>}/>
                            
                        </Route>

                        {/* TEACHER ROUTES */}
                        <Route path='/teacher' element={
                            <TeacherProvider>
                                <TeacherLayout/>
                            </TeacherProvider>
                            
                        }>
                            <Route path='/teacher/homepage' element={<Teacher/>}/>
                            <Route path='/teacher/profile' element={<Profile/>}/>
                            <Route path='/teacher/groups' element={<TeacherGroup/>}/>
                            <Route path='/teacher/grades' element={<TeacherGrade/>}/>
                            <Route path='/teacher/grades/create' element={<TeacherGradeForm/>}/>
                            <Route path='/teacher/grades/edit/:id' element={<TeacherGradeForm/>}/>
                            <Route path='/teacher/groups/:id' element={<ListStudents/>}/>
                            <Route path='/teacher/assignments' element={<ListAssigments/>}/>
                            <Route path='/teacher/assignments/create' element={<FormAssignmentTeacher/>}/>
                            <Route path='/teacher/assignments/edit/:id' element={<FormAssignmentTeacher/>}/>
                        </Route>
                        
                    </Routes>
                    <Footer/>
                </AuthProvider>

            </BrowserRouter>
        </>
    )
}

export default App
