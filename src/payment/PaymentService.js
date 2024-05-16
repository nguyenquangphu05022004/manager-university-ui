import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";
class PaymentService {
    redirectToPaymentPage(amount, content) {
        return Request.requests('post', SystemConstant.BASE_REST_API_URL, `/payment?amount=${amount}&orderInfo=${content}`, '')
    }
}
export default new PaymentService();