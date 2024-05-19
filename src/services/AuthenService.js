import SystemConstant from '../constant/SystemConstant';
import Request from '../request/Request';

class AuthenService {


    login(requestAuth) {
      return Request.requests('post', SystemConstant.BASE_REST_API_URL, '/auth/authenticate', requestAuth);
    }
    logout() {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, '/auth/logout', '');
    }
    sendEmailForgetPassword(emailRequest) {
      return Request.requests('post', SystemConstant.BASE_REST_API_URL, `/mail/forget-password`, emailRequest);
    }
    changePassword(oldPass, newPass) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, `/change-password?oldPass=${oldPass}&newPass=${newPass}`, '');
    }
    initPassword(username, code, password) {
      return Request.requests('post', SystemConstant.BASE_REST_API_URL, `/auth/init-password?username=${username}&password=${password}&code=${code}`, '');
  }

}
export default new AuthenService();