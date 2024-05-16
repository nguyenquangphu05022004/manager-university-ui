import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class ActionService {

    getListResponseOfOneRequestOfStudentCurrent() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, '/student/subject/rp/by', '')
    }
    getListResponseByUsernameCurrentAndSubjectId(subjectId) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/student/subject/rp/${subjectId}`, '')
    }
    getListRequestByUsernameCurrent() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/student/subject/rq/cr`, '')
    }
    confirm(requestId, responseId) {
        return Request.requests('put', SystemConstant.BASE_REST_API_URL, `/student/subject/rq/cf/${requestId}/${responseId}`, '')
    }

}
export default new ActionService();