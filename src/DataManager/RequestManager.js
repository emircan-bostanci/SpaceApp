import axios from "axios";

export default class RequestManager{
     static async GetData(url){
        var result =await axios.get(url);
        return result.data;

    }
}