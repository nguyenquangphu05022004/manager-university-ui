
import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class CourseService {

    getAllCourses() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, '/courses', '');
    }


}

export default new CourseService();