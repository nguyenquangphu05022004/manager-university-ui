import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class StudentRequestExchangeRegister {
    addRequestExchangeRegister(studentExchangeRegisterId) {
        return Request.requests("post", SystemConstant.BASE_REST_API_URL, `/student/subject/rq/${studentExchangeRegisterId}`,'')
    }
    deleteRequestExchangeRegister(studentExchangeRegisterId) {
        return Request.requests("post", SystemConstant.BASE_REST_API_URL, `/student/subject/rq/${studentExchangeRegisterId}`,'')
    }
    getListByStudentExchangeRegisterId(studentExchangeRegisterId) {
        return Request.requests("get", SystemConstant.BASE_REST_API_URL, `/student/subject/rq/${studentExchangeRegisterId}`,'')
    }
    
}
export default new StudentRequestExchangeRegister();