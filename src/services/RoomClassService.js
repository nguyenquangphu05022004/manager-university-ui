
import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class RoomClassService {
    getAllRoomClass(disabled) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/roomClasses`, '');
    }
}

export default new RoomClassService();