
import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class AspirationOfStudentService {

    createAspiration(aspirationRequest) {
      return Request.requests('post', SystemConstant.BASE_REST_API_URL, '/aspirations', aspirationRequest);
    }

    getListByAspirationRegisterIdAndStudentId(aspirationRegisterId, studentId) {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/aspirations/student/${studentId}/aspiration-register/${aspirationRegisterId}`, '');
    }

    getListAspirationOfStudent(aspirationId) {
        return Request.requests('delete', SystemConstant.BASE_REST_API_URL, `/aspirations/${aspirationId}`, '');
    }
    approvalAspirationBySubjectIdAndAspirationRegisterId(subjectId, aspirationRegisterId) {
      return Request.requests('put', SystemConstant.BASE_REST_API_URL, `/aspirations/approval?subjectId=${subjectId}&aspirationRegisterId=${aspirationRegisterId}`, '');
    }


}

export default new AspirationOfStudentService();