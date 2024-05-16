
import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class SemesterService {
    getAllSemesters() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, '/semesters', '');
    }
}

export default new SemesterService();