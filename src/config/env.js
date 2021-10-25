// 配置编译环境和线上环境之间的切换

let baseUrl = '';
let iconfontVersion = ['567566_pwc3oottzol'];
let iconfontUrl = `//at.alicdn.com/t/font_1920546_zj76k6u0888.css`;
let codeUrl = `${baseUrl}/code`
const env = process.env;
if (env.NODE_ENV == 'development') {
    baseUrl = ``; // 开发环境地址
} else if (env.NODE_ENV == 'production') {
    baseUrl = ``; //生产环境地址
} else if (env.NODE_ENV == 'test') {
    baseUrl = ``; //测试环境地址
}

// let domainUrl = "https://106.14.65.8:8085/lakj"; //本地服务器
// let url = "https://106.14.65.8:8085/"; //本地服务器
// let domainUrl = "http://121.43.231.237:8085/lakj"; //本地服务器
// let url = "http://121.43.231.237:8085/";
let domainUrl = "http://192.168.5.15:8085/lakj"; //本地服务器
let url = "http://192.168.5.15:8085";

export {
    baseUrl,
    domainUrl,
    iconfontUrl,
    iconfontVersion,
    codeUrl,
    env,
    url
}