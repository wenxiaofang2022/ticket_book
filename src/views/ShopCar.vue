<template>
  <div class="shop-car-container page-container">
    shopcar
  </div>
</template>

<script>

export default {
  name: 'ShopCar',
  data(){
    return{
      cartGuid:'',
      expiryTime:''
    }
  },
  mounted(){
    this.cartGuid = this.$route.params.cartGuid;
    this.expiryTime = this.$route.params.expiryTime;
    this.geInitData();
  },
  methods:{
    geInitData(){
      this.$http.getHttp({
        name:'getcart',
        params:{
          api:'getcart',
          cartguid:this.cartGuid,
        }
      },(res,success)=>{
        if(success){
          console.log("res===",res);
        }
      })
    }
  },
  beforeUnmount(){

  }
}
</script>
