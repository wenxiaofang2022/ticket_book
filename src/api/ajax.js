import common from './common';
// import Vue from 'vue'
import axios from 'axios'
// 配置API接口地址
// var root = ''
var root = common.api_root
console.log(root)
// 引用axios
// var axios = require('axios')
// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}
/*
  接口处理函数
*/
function apiAxios(method, url, params,success, failure) {
    if (params.data) {
        params.data = filterNull(params.data)
    }
    // console.log(Vue.$config);
    axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params.data : null,
        params: method === 'GET' || method === 'DELETE' ? params.data : null,
        baseURL: root,
        withCredentials: true
    })
    .then(function (res) {
        if(res.status){
            var isError=false;
            if(!params.noErr)isError = successError(res.data);
            success(res.data,isError)
        }
    })
    .catch(function (err) {
        let res = err.response 
        if (res) {
            window.alert('api error, HTTP CODE: ' + res.status)
        }
    })
}
//公共错误处理
function successError(res) {
    if (res.status != 1 && res.data) {
        setLayer(res.data)
        return false;
    }else if(res.status != 1){
        setLayer(res.data)
        return false;
    }
    return true
}

function setLayer(msg){
    alert(msg)
}
// 返回在vue模板中的调用接口
export default {
    get: function (url, params, success, failure) {
        return apiAxios('GET', url, params, success, failure)
    },
    post: function (url, params, success, failure) {
        return apiAxios('POST', url,params, success, failure)
    },
    put: function (url, params, success, failure) {
        return apiAxios('PUT', url, params, success, failure)
    },
    delete: function (url, params, success, failure) {
        return apiAxios('DELETE', url, params, success, failure)
    }
}