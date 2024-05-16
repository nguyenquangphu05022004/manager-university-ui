
import Token from "../services/Token";
import axios from "axios";
const  headers = {
    "ngrok-skip-browser-warning": "69420",
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token.info == null ? '' : Token.info.accessToken}`,
}
class Request {
    requests = (method, tartgetUrl, paramUrl, object) =>  {
      let data;
        if(typeof(object) === 'object') {
           data = JSON.stringify(object);
        }
        data = object;
        let config = {
            method: method,
            maxBodyLength: Infinity,
            url: tartgetUrl + paramUrl,
            headers: headers,
            data: data
          };
        return axios.request(config);
    }
    requestNotJSON = (method, tartgetUrl, paramUrl, object) =>  {
        let config = {
            method: method,
            maxBodyLength: Infinity,
            url: tartgetUrl + paramUrl,
            headers: {
              "ngrok-skip-browser-warning": "69420",
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${Token.info == null ? '' : Token.info.accessToken}`,
          },
            data: object
          };
        return axios.request(config);
    }
}
export default new Request();