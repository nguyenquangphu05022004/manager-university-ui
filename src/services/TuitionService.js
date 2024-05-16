import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class TuitionService {

    initTuition(requestData) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, `/tuitions/init`, requestData);
    }

    getListByMajorId() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, '/time/table', '');
    }
    getListBySubjectId(subjectId) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/time/table/${subjectId}`);
    }
}

export default new TuitionService();