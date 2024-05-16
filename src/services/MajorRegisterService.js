import SystemConstant from '../constant/SystemConstant';
import Request from '../request/Request';

class MajorRegisterService {


    registerSubejct(requestData) {
      return Request.requests('post', SystemConstant.BASE_REST_API_URL, '/majorRegisters', requestData);
    }
    getMajorRegisterByMajorIdAndSeasonNotDisabled(majorId, disabled) {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/majorRegisters/major/${majorId}?disabled=${disabled}`, '');
    }
    getAllByStudentId(studentId) {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/majorRegisters/list/student/${studentId}`, '');
    }
    getMajoRegisterByStudentIdAndSeasonNotDisabledAndOpenRegister(studentId, openRegister) {
      console.log(`/majorRegisters/student/${studentId}?openRegister=${openRegister}`)
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/majorRegisters/student/${studentId}?openRegister=${openRegister}`, '');
    }
    getAllMajorRegister() {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/majorRegisters`, '');
    }
    getAllByCoursesId(coursesId) {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/majorRegisters/courses/${coursesId}`, '');
    }
}
export default new MajorRegisterService();