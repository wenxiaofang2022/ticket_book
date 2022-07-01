<template>
  <div class="page-home-container page-container">
    home
  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return{

    }
  },
  mounted(){
    this.tesAjax();
  },
  methods:{
    tesAjax(){
      this.$http.getHttp({
        name:'geteventshowdatetime'
      },(data,success)=>{
        if(success){
          console.log("data===",data);
        }
      })
    }
  }
}
</script>
