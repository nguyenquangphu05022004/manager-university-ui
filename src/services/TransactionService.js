
import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";

class TransactionService {

    createTransaction(targetRegisterId, studentId) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, `/transactions?targetRegisterId=${targetRegisterId}&studentId=${studentId}`,'')
    }
    confirmTransaction(targetRegisterId, requestRegisterId) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, `/transactions/confirm?targetRegisterId=${targetRegisterId}&requestRegisterId=${requestRegisterId}`,'')
    }
    deleteByTargetRegisterAndStudentRequestId(targetRegisterId, studentRequestId) {
        return Request.requests('delete', SystemConstant.BASE_REST_API_URL, `/transactions?targetRegisterId=${targetRegisterId}&studentRequestId=${studentRequestId}`,'')
    }

}
export default new TransactionService();