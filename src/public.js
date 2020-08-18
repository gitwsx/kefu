import axios from "axios";
var domain = window.location.origin;
if(window.location.origin=='http://localhost:8080'){
    domain='http://192.168.5.110:8085';//线上
    //domain='http://tampa.mxth.com/';//测试
}
const domainUrl = domain;
const mz = {
    ajax(opt) {
        const domain = domainUrl;
        let url = opt.url || '';
        let method = opt.method || 'POST';
        let data = opt.data || {};
        let responseType = opt.dataType || 'json';
        axios({
            url: url,
            baseURL: domain,
            method: method,
            params: data,
        }).then(function (res) {
            opt.success(res);
            // if (res.status == 200) {
            //     if (res.data.result == "success") {
            //         opt.success(res.data.data);
            //     } else {
            //         console.log(res.data.errorMsg)
            //     }
            // }
        }, function (err) {
            console.log(err)
            opt.error(err)
        })
    },
    post(opt) {
        const domain = domainUrl;
        let url = opt.url || '';
        let method = 'POST';
        let data = opt.data || {};
        let responseType = opt.dataType || 'json';
        axios({
            url: url,
            baseURL: domain,
            method: method,
            data: data,
        }).then(function (res) {
            console.log(opt,11111111111111111)
            opt.success(res)
            // if (res.status == 200) {
            //     opt.success(res.data);
            // }
        }, function (err) {
            opt.error(err)
        })
    },
    get(opt) {
        const domain = domainUrl;
        let url = opt.url || '';
        let method = 'POST';
        let data = opt.data || {};
        let responseType = opt.dataType || 'json';
        let header = opt.header;
        var config = axios.create({
            baseURL: domain,
            method: method,
            headers: header
        })

        // header["cache-control"]='no-cache';
        config.get(url, { params: data }).then(function (res) {
            if (res.status == 200) {
                opt.success(res.data);
            }
        }, function (err) {
            opt.error(err)
        })
    },
    GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
}
export default mz;
