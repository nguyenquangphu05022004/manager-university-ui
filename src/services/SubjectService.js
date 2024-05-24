import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class SubjectService {

    getAllSubjects() {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/subjects`,'');
    }
    createSubject(subject) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, `/subjects`,subject);
    }
    updateSubject(subject, id) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, `/subjects/${id}`,subject);
    }
    deleteSubject(ids) {
        return Request.requests('delete', SystemConstant.BASE_REST_API_URL, `/subjects`,ids);
    }
    getSubjectById(id) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/subjects/${id}`,'');
    }
    findById(id) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/subjects/${id}`,'');
    }
    getAllSubjectByMajorId(majorId) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/subjects/major/${majorId}`,'');
    }
    getAllSubjectByMajorIdAndSchoolYearIdAndCourseIdAndSemesterId(majorId, schoolYearId, courseId, semesterId) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/subjects/${majorId}/${schoolYearId}/${courseId}/${semesterId}`, '')
    }
}
export default new SubjectService();