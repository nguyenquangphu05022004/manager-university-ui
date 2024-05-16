
import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class FileStorageService {
    uploads(data) {
        return Request.requestNotJSON('post', SystemConstant.BASE_REST_API_URL, "/file/uploads", data);
    }

}

export default new FileStorageService();