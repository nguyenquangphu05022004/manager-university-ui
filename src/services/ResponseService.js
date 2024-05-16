
import Request from "../request/Request";
import SystemConstant from "../constant/SystemConstant";
class ResponseService {
    responseExchangeSubject(
        studentExchangeRegisterId,
        studentRequestRegisterId
    ) {
        return Request.requests(
            'put',
            `/response/ex/subject/${studentExchangeRegisterId}/${studentRequestRegisterId}`,
            ""
        )
    }
    responseCreateBlog(blogId) {
        return Request.requests(
            'put',
            `/response/blog/${blogId}`,
            ''
        )
    }
    responseReport() {
        
    }
}
export default new ResponseService();