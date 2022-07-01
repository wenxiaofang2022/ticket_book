import ajax from './ajax.js';
//获取URL查询字符串值
function getURLSearchParams(params){
  if(!isArray(params)) return;
  let param=new URLSearchParams();
  for(let i=0,len=params.length;i<len;i++){
      param.append(params[i].name,params[i].val)
  }
  return param
}

//判断是数组
function isArray(o){
  return Object.prototype.toString.call(o)=='[object Array]';
}

let apiList = {
  getprivateevent:{
    url: '/sistic/api/sistic',
    params: {
      api:'getprivateevent',
      promoCode:''
    },
    type: "get"
  },
  geteventshowdatetime:{
    url: '/sistic/api/sistic',
    params: {
      api:'geteventshowdatetime',
      eventType:1
    },
    type: "get"
  },
  geteventoverviewseatmap:{
    url: '/sistic/api/sistic',
    params: {
      api:'geteventoverviewseatmap',
      pid:''
    },
    type: "get"
  },
  getSeatSectionAvailability:{
    url: '/sistic/api/sistic',
    params: {
      api:'getSeatSectionAvailability',
      pid:'',
      seatSectionId:''
    },
    type: "get"
  },
  starttimer:{
    url: '/sistic/api/sistic',
    params: {
      api:'starttimer'
    },
    type: "get"
  },
  getSeatOffer:{
    url: '/sistic/api/sistic',
    params: {
      api:'getSeatOffer',
      pid:'',
      qty:'',
      priceCatId:'',
      seatSectionId:'',
      mode:''
    },
    type: "get"
  },
  getTicketType:{
    url: '/sistic/api/sistic',
    params: {
      api:'getTicketType',
      pid:'',
      priceCatId:''
    },
    type: "get"
  },
  addtocart:{
    url: '/sistic/api/sistic',
    params: {
      api:'addtocart',
      cartGuid:'',
      pid:'',
      priceClassMap:'',
      priceCatId:'',
      seatSectionId:'',
      mode:'',
      inventoryList:''
    },
    type: "get"
  },
  getcarttimer:{
    url: '/sistic/api/sistic',
    params: {
      api:'getcarttimer',
      reservedTime:'',
      flipBn:''
    },
    type: "get"
  },
  clearcart:{
    url: '/sistic/api/sistic',
    params: {
      api:'clearcart',
    },
    type: "get"
  },
  getcart:{
    url: '/sistic/api/sistic',
    params: {
      api:'getcart',
      cartguid:''
    },
    type: "get"
  },
  submitPrepayment:{
    url: '/sistic/api/sistic',
    params: {
      api:'submitPrepayment',
      cartguid:'',
      email:'',
      firstname:'',
      lastname:'',
      areacode:'',
      phonenumber:'',
      remarks:''
    },
    type: "get"
  },
  removeCartItem:{
    url: '/sistic/api/sistic',
    params: {
      api:'removeCartItem',
      cartitemid:'',
      priceclasscode:''
    },
    type: "get"
  }
};

//获取AJAX请求 数据
function getHttp(param,success,failure){
  let data=apiList[param.name];
  var params=param;
  var url = data.url;
  if(!data){
      alert("未找到此对象")
      return
  }
  if (param.header == 2 && param.params){
      params.data = getURLSearchParams(param.params)
  }
  else if (param.header == 2){
      params.data = getURLSearchParams(data.params)
  }else if(param.params){
      params.data=param.params
  }else{
      params.data=data.params;
  }

  if(param.url){
      url = param.url
  }

  if(param.code){
      url = url+param.code
  }

  if(!data.type || data.type=="post"){
      ajax.post(url,params,success,failure);
  }else if(data.type=="get"){
      ajax.get(url,params,success,failure);
  }
  else if(data.type=="put"){
      ajax.put(url,params,success,failure);
  }
}

export default {
  getHttp
}