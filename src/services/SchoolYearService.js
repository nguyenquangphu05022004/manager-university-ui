
import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class SchoolYearService {

    getAllSchoolYear() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, '/schoolYears', '');
    }


}

export default new SchoolYearService();