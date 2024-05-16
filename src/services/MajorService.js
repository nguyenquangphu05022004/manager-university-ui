
import SystemConstant from '../constant/SystemConstant'
import Request from "../request/Request";

class MajorSerivce {
    getAllMajors() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, '/majors', '');
    }
    deleteMajor(ids) {
        return Request.requests('delete', SystemConstant.BASE_REST_API_URL, '/majors', ids);
    }
    updateMajor(major, id) {
        return Request.requests('put', SystemConstant.BASE_REST_API_URL, '/majors/' +id, major); 
    }
    createMajor(major) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, '/majors/', major);

    }
    getMajorById(id) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, '/majors/' + id, '');
    }
}
export default new MajorSerivce();