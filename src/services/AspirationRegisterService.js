
import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class AspirationRegisterService {


    getListAspirationRegisters() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/aspiration-register`, '');
    }


}

export default new AspirationRegisterService();