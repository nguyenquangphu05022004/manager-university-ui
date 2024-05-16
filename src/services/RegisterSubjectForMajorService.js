
import SystemConstant from '../constant/SystemConstant';
import Request from '../request/Request';
class RegisterSubjectForMajorService {
    registerSubjectForMajor(register) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, '/subject/major', register);
    }
    getListRegisterOfMajorOfCurrentStudent() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/subject/major/`,'')
    }
    
}
export default new RegisterSubjectForMajorService();
