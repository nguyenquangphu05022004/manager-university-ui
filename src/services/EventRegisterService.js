
import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class EventRegisterService {
    createEventRegister(requestData) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, '/events',requestData);
    }


}

export default new EventRegisterService();