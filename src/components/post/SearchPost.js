import Posts from "./Posts";
const posts = Posts;
function BinarySearch(id) {
    let l = 0;
    let r = posts.length - 1;
    while(l <= r) {
        let mid = (l + r) / 2;
        if(posts[mid].id === id) {
            return posts[mid];
        } else if(posts[mid].id < id) {
            r = mid - 1;
        } else if(posts[mid].id > id) {
            l = mid + 1;
        }
    }
    return null;
}
export default BinarySearch;