const data = window.localStorage.getItem('data');
var info = '';
if(data === null || data === 'undefined') {
    info = null;
} else {
    if(typeof data === 'string') {
        info = JSON.parse(data);
        const time = new Date(info.expired).getTime()
        console.log(time)
        const timeNow = new Date().getTime();
        console.log("time now: ", timeNow)
        if(timeNow > time) {
            window.localStorage.removeItem('data');
            info = null;
        }
    }
}
class Token {
    info;
    constructor(info) {
        this.info = info;
    }
}
export default new Token(info);