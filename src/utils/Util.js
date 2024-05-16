import Token from '../services/Token'
class Util {
    formatNumber(prime) {
        let number = prime + "";
        let lengthNumber = number.length;
        const numberFormat = [];
        while (lengthNumber >= 3) {
            const sub = number.substring(lengthNumber - 3, lengthNumber);
            number = number.substring(0, lengthNumber - 3);
            lengthNumber = number.length
            numberFormat.push(sub);
        }
        if (number) {
            numberFormat.push(number)
        }
        let l = 0, r = numberFormat.length - 1;
        while (l < r) {
            let tmp = numberFormat[l];
            numberFormat[l] = numberFormat[r];
            numberFormat[r] = tmp;
            l++;
            r--;
        }
        const formatNumber = numberFormat.join(",");
        return formatNumber;
    }

    payForTuition(amount) {
        //info: ma sinh vien de kiem tra xem msv nao dong
        const info = Token.info.username;
        return `https://img.vietqr.io/image/MB-8999005022004-print.png?accountName=${"Đóng tiền học"}&amount=${amount}&addInfo=${info}`
    }
    getProfile() {
        if (Token.info != null && Token.info.person != null) {
            return Token.info.person;
        }
        return null;
    }
    getMajor() {
        const profile = this.getProfile();
        if (profile.major != null) {
            return profile.major;
        }
        return null;
    }
    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
               let cookie =  c.substring(name.length, c.length);
               return cookie;
            }
        }
        return null;
    }
}
export default new Util();