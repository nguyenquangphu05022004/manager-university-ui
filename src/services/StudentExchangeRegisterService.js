
import SystemConstant from '../constant/SystemConstant'
import Request from "../request/Request";
class StudentExchangeRegisterService {


    exchangeRegister(registerId) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL,`/student/subject/ex/${registerId}`, '');
    }

    getListExchangeRegister() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/student/subject/ex`,'')
    }

    exchangeUpdate(dataParam, dataBody) {
        return Request.requests('put', SystemConstant.BASE_REST_API_URL,`/register/subject/${dataParam.username}/${dataParam.subjectId}`, dataBody)
    }
    updateExchangeRecord(id) {
        return Request.requests('put', SystemConstant.BASE_REST_API_URL, `/register/subject/${id}`)
    }

    delete(id) {
        return Request.requests('delete', SystemConstant.BASE_REST_API_URL, `/register/subject/${id}`, '');
    }
    getListExchangeOfStudentCurrent() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/student/subject/ex/user`,'')
    }
}
export default new StudentExchangeRegisterService();