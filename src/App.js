import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import ListStudentComponent from './components/student/ListStudentComponent';
import AddStudentComponent from './components/student/AddStudentComponent';
import ListMajorComponent from './components/major/ListMajorComponent';
import AddMajorComponent from './components/major/AddMajorComponent';
import ListSubjectComponent from './components/subject/ListSubjectComponent'
import AddSubjectComponent from './components/subject/AddSubjectComponent';
import LoginComponent from './components/authen/LoginComponent';
import RegisterSubjectComponent from './components/subject/RegisterSubjectComponent';
import ExchangeSubject from './components/exchange_subject/ExchangeSubject';
import ListExchangeOfStudent from './components/exchange_subject/ListStudentExchangeRegister';
import Admin from './components/admin/Admin';
import ListCourseComponent from './components/course/ListCourseComponent';
import AddCourseComponent from './components/course/AddCourseComponent';
import FullCalendarComponent from './components/FullCalendarComponent';
import ListGradeComponent from './components/grade/ListGradeComponent'
import TuitionComponent from './components/tuition/TuitionComponent';
import ProfileComponent from './components/ProfileComponent';
import PostList from './components/post/PostList';
import PostNotificationComponent from './components/post/PostNotificationComponent';
import AddPostComponent from './components/post/AddPostComponent';
import ChangePasswordComponent from './components/authen/ChangePasswordComponent'
import ForgetPasswordComponent  from "./components/authen/ForgetPasswordComponent";
import TestSchedule from './components/testSchedule/TestSchedule';
import AdminGradeComponent from './components/grade/AdminGradeComponent';
import EnterGradeForStudentComponent from './components/grade/EnterGradeForStudentComponent';
import TuitionAdminComponent from './components/tuition/TuitionAdminComponent';
import EventRegister from './components/event/EventRegister';
import InfoSubjectTeacherOfTeacher from './components/subject/InfoSubjectTeachOfTeacher';
import InitPassword from './components/authen/InitPassword';
import EducationSubjectComponent from './components/subject/EducationSubjectComponent'
import AdminTestSchedule from './components/testSchedule/AdminTestSchedule'
import AspirationRegisterSubjectComponent from './components/aspirationRegisterSubject/AspirationRegisterSubjectComponent'
function App() {
    return (
        <div>
            <Router>
                <HeaderComponent/>
                <div className="container">
                    <Routes>
                         <Route path="" element={<PostList/>}/>
                        <Route exact path="/trang-chu" element={<PostList/>}/>
                        <Route path="/admin/students" element={<ListStudentComponent/>}/>
                        <Route path="/add-student" element={<AddStudentComponent/>}/>
                        <Route path="/edit-student/:id" element={<AddStudentComponent/>}/>
                        <Route path="/admin/majors" element={<ListMajorComponent/>}/>
                        <Route path="/add-major" element={<AddMajorComponent/>}/>
                        <Route path="/edit-major/:id" element={<AddMajorComponent/>}/>
                        <Route path="/admin/subjects" element={<ListSubjectComponent/>}/>
                        <Route path="/edit-subject/:id" element={<AddSubjectComponent/>}/>
                        <Route path="/add-subject" element={<AddSubjectComponent/>}/>
                        <Route path="/dang-nhap" element={<LoginComponent/>}/>
                        <Route path="/dang-ky-mon-hoc" element={<RegisterSubjectComponent/>}/>
                        <Route path="/trao-doi-mon-hoc" element={<ExchangeSubject/>}/>
                        <Route path="/thong-tin-trao-doi-mon-hoc" element={<ListExchangeOfStudent/>}/>
                        <Route path="/admin" element={<Admin/>}/>
                        <Route path="/admin/courses" element={<ListCourseComponent/>}/>
                        <Route path="/admin/add-course" element={<AddCourseComponent/>}/>
                        <Route path="/thoi-khoa-bieu" element={<FullCalendarComponent/>}/>
                        <Route path="/xem-diem" element={<ListGradeComponent/>}/>
                        <Route path="/xem-hoc-phi" element={<TuitionComponent/>}/>
                        <Route path="/profile" element={<ProfileComponent/>}/>
                        <Route path="/notifications/:id" element={<PostNotificationComponent/>}/>
                        <Route path="/doi-mat-khau" element={<ChangePasswordComponent/>}/>
                        <Route path="/quen-mat-khau" element={<ForgetPasswordComponent/>}/>
                        <Route path="/xem-lich-thi" element={<TestSchedule/>}/>
                        <Route path="/admin/notification" element={<AddPostComponent/>}/>
                        <Route path="/admin/grades" element={<AdminGradeComponent/>}/>
                        <Route path="/admin/grades/enter-grade-for-student" element={<EnterGradeForStudentComponent/>}/>
                        <Route path="/admin/tuition" element={<TuitionAdminComponent/>}/>
                        <Route path="/admin/events" element={<EventRegister/>}/>
                        <Route path="/mon-hoc-giang-day" element={<InfoSubjectTeacherOfTeacher/>}/>
                        <Route path="/nhap-diem" element={<EnterGradeForStudentComponent/>}/>
                        <Route path="/init-password" element={<InitPassword/>}/>
                        <Route path="/chuong-trinh-dao-tao" element={<EducationSubjectComponent/>}/>
                        <Route path="/dang-ky-nguyen-vong" element={<AspirationRegisterSubjectComponent/>}/>
                        <Route path="/admin/test-schedule" element={<AdminTestSchedule/>}/>

                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;