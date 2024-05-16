import SystemConstant from '../constant/SystemConstant'
import Request from "../request/Request";



class RegisterSubjectService {

    registerSubject(requestData) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, `/registers`,requestData)
    }
    deleteRegister(registerId) {
        return Request.requests('delete', SystemConstant.BASE_REST_API_URL, `/registers/${registerId}`, '')
    }
    getAllRegisterByStudentIdAndSeasonNotDisabled(studentId, disabled) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/registers/student/${studentId}?disabled=${disabled}`,'');
    }
    transaction(targetRegisterId, enable) {
        return Request.requests('put', SystemConstant.BASE_REST_API_URL, `/registers/transaction/${targetRegisterId}?transaction=${enable}`,'')
    }
    getAllRegisterOpenedTransactionBySubjectIdAndNotOfStudentId(subjectId, studentId) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/registers/student/${studentId}/subject/${subjectId}`,'')
    }

}
export default new RegisterSubjectService()