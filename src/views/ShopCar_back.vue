<template>
  <div class="shop-car-container page-container">
    <div class="nodata-box">
      <div class="text">Your shopping cart is empty</div>
      <div class="btn active" @click="goShopping">Continue Shopping</div>
    </div>
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
    goShopping(){
      this.$router.push({
        path: '/'
      });
    },
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
<style lang="scss">
.shop-car-container{
  .nodata-box{
    max-width: 1060px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 56px;
    text-align: center;
    .text{
      margin-bottom: 25px;
      font-family: 'Agency FB';
      font-weight: 400;
      font-size: 1.250rem;
      line-height: 1.250em;
    }
  }
}
</style>
