
import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class AspirationOfStudentService {

    createAspiration(aspirationRequest) {
      return Request.requests('post', SystemConstant.BASE_REST_API_URL, '/aspirations', aspirationRequest);
    }

    getListAspirationBySeasonIdAndStudentId(seasonId, studentId) {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/aspirations/student/${studentId}/season/${seasonId}`, '');
    }

    getListAspirationOfStudent(aspirationId) {
        return Request.requests('delete', SystemConstant.BASE_REST_API_URL, `/aspirations/${aspirationId}`, '');
    }


}

export default new AspirationOfStudentService();