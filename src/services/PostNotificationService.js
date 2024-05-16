import SystemConstant from "../constant/SystemConstant";
import Request from "../request/Request";

class PostNotificationService {

    getAllPosts() {
        return Request.requests("get", SystemConstant.BASE_REST_API_URL, "/notifications",'')
    }
    createPost(post) {
        return Request.requests("post", SystemConstant.BASE_REST_API_URL, '/notifications', post);
    }
    getPostById(postId) {
        return Request.requests("get", SystemConstant.BASE_REST_API_URL, `/notifications/${postId}`, '');
    }

}

export default new PostNotificationService();