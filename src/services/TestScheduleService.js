import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class TestScheduleService {


    getListBySeasonIdAndStudentId(seasonId, studentId) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/testSchedules?seasonId=${seasonId}&studentId=${studentId}`, '');
    }
    createTestSchedule(request) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, `/testSchedules`, request);
    }
}

export default new TestScheduleService();