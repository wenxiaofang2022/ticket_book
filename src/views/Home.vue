<template>
  <div class="page-home-container page-container">
    <div class="tour-info">
      <div class="s_thumbnail">
        <img src="@/assets/img/event-thumbnail.jpg"/>
      </div>
      <div class="s_info">
        <div class="s_venuename">Justin Bieber Justic World Tour 2022 - Philippines</div>
        <div class="s_venuedatetime">
            <div class="s_venue v_select">
              <svg-icon class="my-icon" icon="location"/>
              <div>Newport Performing Arts Theatre</div>
            </div>
            <div class="s_datetime v_select">
              <svg-icon class="my-icon" icon="calendar"/>
              <div>
                <span v-html="dateHtml.dateDay"></span>
                /
                <span v-html="dateHtml.dateTimeDuration"></span>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="chose-ticket-box">
      <div class="box-left">
        <div class="select-tit">Select A Section</div>
        <div class="select-list"></div>
        <div class="section-confirm"></div>
      </div>
      <div class="box-right">
        <div class="fixed-box-right">
          <div class="subtotal item">
            <div class="left">Subtotal</div>
            <div class="right">PHP 0.00</div>
          </div>
          <div class="booking-fee item">
            <div class="left">Booking Fee</div>
            <div class="right">PHP 0.00</div>
          </div>
          <div class="total item">
            <div class="left">Total</div>
            <div class="right">PHP 0.00</div>
          </div>
          <div class="checkout-btn">Check Out</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      dateHtml:''
    }
  },
  mounted(){
    this.getDate();
    // this.testAjax();
  },
  methods:{
    getDate(){
      this.$http.getHttp({
        name:'geteventshowdatetime',
      },(res,success)=>{
        if(success){
          console.log("res===",res);
          this.dateHtml = res.data[0][0];
        }
      })
    },
    testAjax(){
      this.$http.getHttp({
        name:'geteventoverviewseatmap',
        params:{
          api:'geteventoverviewseatmap',
          pid:1722018
        }
      },(res,success)=>{
        if(success){
          console.log("res===",res);
        }
      })
    }
  }
}
</script>
<style lang="scss">
.page-home-container{
  .tour-info{
    padding: 15px 30px;
    background: #F5F5F5;
    display: flex;
    box-sizing: border-box;
    .s_thumbnail{
      width: 78px;
      margin-right: 14px;
      img{
        width: 100%;
        display: block;
      }
    }
    .s_info{
      width: calc(100% - 92px);
      margin-top: -4px;
      text-align: left;
      font-size: 0.813rem;
      line-height: 1.385em;
      .s_venuedatetime{
        display: flex;
        margin-top: 3px;
        .v_select{
          width: 50%;
          box-sizing: border-box;
          padding-right: 20px;
          color: #0098FF;
          position: relative;
          margin-top: 4px;
          .svg-icon{
            position: absolute;
            left: 0px;
            top: 50%;
            transform: translateY(-50%);
          }
          div{
            padding-left: 1.2em;
          }
        }
      }
    }
  }
}
</style>
