
import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class SeasonService {
    getAllSeasonByDisabled(disabled) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/seasons/search?disabled=${disabled}`, '');
    }
    getAllSeasonExactlyOfStudent(studentId) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/seasons/student/${studentId}`, '');
    }
    getSeasonById(seasonId) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/seasons/${seasonId}`, '');
    }
    getAllByCoursesId(coursesId) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/seasons/courses/${coursesId}`, '');
    }
    getAllSeason() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/seasons`, '');
    }
    getListSeasonExtraByStudent(studentId) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/seasons/student/${studentId}/extra`, '');
    }
    
}

export default new SeasonService();