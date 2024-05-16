const data = window.localStorage.getItem('data');
var info = '';
if(data === null || data === 'undefined') {
    info = null;
} else {
    if(typeof data === 'string') {
        info = JSON.parse(data);
    }
}
class Token {
    info;
    constructor(info) {
        this.info = info;
    }
}
export default new Token(info);