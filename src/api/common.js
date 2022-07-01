const root=['https://alexandracraig.com','https://alexandracraig.com','https://alexandracraig.com'];
const base = ["alexandracraig.com",'alexandracraig.com','alexandracraig.com'];
const env=0;
const common = {
  api_root:root[env], //域名
  env:env, //环境 0测试 1正式 2本地
  base:base[env],
}
export default common;