import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class SubjectGroupService {

    createSubjectGroup(requestData) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, `/subjectGroups`, requestData);
    }
    getAllSubjectGroupBySubjectId(subjectId) {
        return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/subjectGroups/subject/${subjectId}`, '');
    }
    updateTeacher(subjectGroupId, teacherCode) {
        return Request.requests('put', SystemConstant.BASE_REST_API_URL, `/subjectGroups/${subjectGroupId}/teacher?teacherCode=${teacherCode}`, '');
    }
}

export default new SubjectGroupService();