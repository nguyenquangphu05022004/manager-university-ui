import Request from "../request/Request"
import SystemConstant from "../constant/SystemConstant"
class GradeService {

    getAllGradeByRegisterOfMajorId(registerOfMajorId) {
        return Request.requests("get", SystemConstant.BASE_REST_API_URL, `/grades/user/${registerOfMajorId}`, "")
    }
    getListComponentGrade() {
        return Request.requests("get", SystemConstant.BASE_REST_API_URL, `/grades/gradeComponents`, "")
    }
    submitEnterGrade(studentCode, subjectCode, requestData) {
        return Request.requests("post", SystemConstant.BASE_REST_API_URL, `/grades?studentCode=${studentCode}&subjectCode=${subjectCode}`, requestData)
    }
    initGradeByMajorRegister(majorRegister) {
        return Request.requests("post", SystemConstant.BASE_REST_API_URL, `/grades/init?majorRegisterId=${majorRegister}`, "")
    }
}
export default new GradeService();