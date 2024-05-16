import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class TeacherService {


    findById(teacherId) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/teachers/${teacherId}`, '');
    }
    createTime(requestData) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, '/times', requestData);

    }
}

export default new TeacherService();