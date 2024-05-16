
import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";

class StudentService {

    getAllStudents() {
          return Request.requests('get', SystemConstant.BASE_REST_API_URL, '/students','')
    }
    createStudent(student) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, '/students',student)
    }
    getStudentCurrent() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, '/students/user','')
    }
    updateStudent(student, studentId) {
        return Request.requests('put', SystemConstant.BASE_REST_API_URL, '/students/' + studentId,student)
    }
    deleteStudent(ids) {
       return Request.requests('delete', SystemConstant.BASE_REST_API_URL, '/students', ids);
    }
}
export default new StudentService();