import SystemConstant from '../constant/SystemConstant';
import Request from '../request/Request';

class AuthenService {


    login(requestAuth) {
      return Request.requests('post', SystemConstant.BASE_REST_API_URL, '/auth/authenticate', requestAuth);
    }
    logout() {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, '/auth/logout', '');
    }

    changePassword(oldPass, newPass) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, `/change-password?oldPass=${oldPass}&newPass=${newPass}`, '');
    }

}
export default new AuthenService();