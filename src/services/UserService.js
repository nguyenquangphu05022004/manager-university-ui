
import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";

class UserService {

    getUser() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/user`,'')
    }
}
export default new UserService();