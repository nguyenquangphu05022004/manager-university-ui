import SystemConstant from '../constant/SystemConstant';
import Request from '../request/Request';

class MajorRegisterService {


    registerSubejct(requestData) {
      return Request.requests('post', SystemConstant.BASE_REST_API_URL, '/majorRegisters', requestData);
    }
    getMajorRegisterByMajorIdAndSeasonNotDisabled(majorId, disabled) {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/majorRegisters/major/${majorId}?disabled=${disabled}`, '');
    }
    getAllByStudentIdAndCoursesId(studentId, coursesId) {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/majorRegisters/list/student/${studentId}/courses/${coursesId}`, '');
    }
    getMajoRegisterByStudentIdAndSeasonNotDisabledAndOpenRegisterAdCoursesId(studentId, openRegister, coursesIdOfStudent) {
      console.log(`/majorRegisters/student/${studentId}?openRegister=${openRegister}`)
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/majorRegisters/student/${studentId}?openRegister=${openRegister}&coursesIdOfStudent=${coursesIdOfStudent}`, '');
    }
    getAllMajorRegister() {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/majorRegisters`, '');
    }
    getAllByCoursesId(coursesId) {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/majorRegisters/courses/${coursesId}`, '');
    }

    getBySeasonIdAndMajorId(seasonId, majorId) {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/majorRegisters/major/${majorId}/season/${seasonId}`, '');
    }
    getBySeasonIdAndStudentId(seasonId, studentId) {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/majorRegisters/student/${studentId}/season/${seasonId}`, '');
    }
    getListExtraByStudentId(studentId) {
      return Request.requests('get', SystemConstant.BASE_REST_API_URL, `/majorRegisters/extra/student/${studentId}`, '')
    }
    handleOpenRegister(majorRegisterId, openRegister) {
      return Request.requests('put', SystemConstant.BASE_REST_API_URL, `/majorRegisters/${majorRegisterId}/openRegister?openRegister=${openRegister}`, '')

    }
}
export default new MajorRegisterService();