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
        <div class="select-list">
          <div class="select-item">
            <div class="label">Select Your Category</div>
            <select @change="choseSeat">
              <option value="-1">Select Category</option>
              <option v-for="(item,m) in seatSectionList" :key="'seat_'+m" :value="m">{{item.priceCatAlias+'-'+item.priceCatAmount.formatted}}</option>
            </select>
          </div>
          <div class="select-item">
            <div class="label">Select Your Section</div>
            <select @change="choseSection" :disabled="subSectionList.length==0">
              <option value="-1">Select Section</option>
              <option :value="m" v-for="(item,m) in subSectionList" :key="'sub_seat_section_'+m">{{item.seatSectionAlias}}</option>
            </select>
          </div>
        </div>
        <div class="section-confirm">
          <div class="img-box">
            <img :src="imageURL"/>
          </div>
          <div class="confirm-text">
            <div class="text-tit">Seating plan is not drawn to scale</div>
            <div>For patrons who require special access, please contact the SISTIC Hotline at <a href="tel:+65 6348 5555">+65 6348 5555</a></div>
          </div>
          <div class="confirm-btn">
            <div class="btn" :class="confirmActive?'active':''">Confirm Section</div>
          </div>
        </div>
      </div>
      <div class="box-right" :class="boxFix?'v_fixed':'v_scroll'">
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
      dateHtml:'',
      imageURL:null,
      seatSectionList:[],
      subSectionList:[],
      boxFix:true,
      confirmActive:false,
    }
  },
  mounted(){
    this.getDate();
    this.getSeatData();
    window.addEventListener('scroll',()=>{
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      let ticket_scrollTop = sessionStorage.getItem('ticket_scrollTop')||0;
      if(scrollTop-ticket_scrollTop>0){
        this.boxFix=false;
      }
      else{
        this.boxFix=true;
      }
      sessionStorage.setItem('ticket_scrollTop',scrollTop);
    })
  },
  methods:{
    choseSeat(e){
      console.log(e.target.value);
      let index = e.target.value;
      if(index>-1){
        this.subSectionList = this.seatSectionList[index].seatSectionList;
      }
      else{
        this.subSectionList = [];
      }
    },
    choseSection(e){
      console.log(e.target.value);
      let index = e.target.value;
      if(index>-1){
        this.confirmActive = true;
      }
      else{
        this.confirmActive = false;
      }
    },
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
    getSeatData(){
      this.$http.getHttp({
        name:'geteventoverviewseatmap',
        params:{
          api:'geteventoverviewseatmap',
          pid:1722018
        }
      },(res,success)=>{
        if(success){
          console.log("res===",res);
          this.imageURL = res.data.imageURL;
          this.seatSectionList = res.data.seatSectionList;
        }
      })
    }
  },
  beforeUnmount(){
    sessionStorage.removeItem('ticket_scrollTop');
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
  .chose-ticket-box{
    max-width: 1060px;
    margin: 0 auto;
    text-align: left;
    padding: 0px 30px 60px;
    .box-left{
      max-width:690px;
      width: calc(100% - 288px);
      box-sizing: border-box;
      padding-right: 30px;
      padding-top: 27px;
      text-align: left;
      .select-tit{
        font-family: 'Agency FB';
        font-size: 1.875rem;
        font-weight: 400;
      }
      .select-list{
        .select-item{
          margin-top: 7px;
          .label{
            font-size: 0.813rem;
            line-height: 1.385em;
            color: #4A4A4A;
          }
          select{
            display: block;
            box-sizing: border-box;
            width: 100%;
            height: 40px;
            padding: 0;
            font-size: 0.938rem;
            font-weight: 600;
            line-height: 39px;
            border: none;
            border-bottom: 1px dotted #4A4A4A;
            outline: 0;
            border-radius: 0;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background: url('@/assets/img/icon-arrowselect.svg') center right no-repeat;
          }
        }
      }
      .section-confirm{
        background: #F5F5F5;
        box-sizing: border-box;
        padding: 0 14px 25px;
        margin-top: 30px;
        .img-box{
          width: 100%;
          padding: 20px 0 15px;
          img{
            width: 100%;
          }
        }
        .confirm-text{
          margin-top: 11px;
          font-size: 0.813rem;
          line-height: 1.385em;
          border-bottom: 1px dotted #DFDFDF;
          padding-bottom: 20px;
          a{
            text-decoration: underline;
            color: #0098FF;
          }
          .text-tit{
            font-weight: bold;
          }
        }
        .confirm-btn{
          padding-top: 25px;
          .btn{
            width: 288px;
            margin-left: auto;
            margin-right: auto;
            border: none;
            display: block;
            height: 43px;
            line-height: 43px;
            font-size: 0.938rem;
            text-decoration: none;
            text-align: center;
            border-radius: 60px;
            box-sizing: border-box;
            color: #FCFCFC;
            background: #A6A5A3;
            cursor: pointer;
            &.active{
              background: #151009;
            }
          }
        }
      }
    }
    .box-right{
      width: 288px;
      position: fixed;
      transition: transform 0.3s;
      top: 213px;
      right:calc((100% - 1060px) / 2 + 30px);
      background: #F1F9FF;
      padding: 20px 14px 25px;
      color: #4A4A4A;
      &.v_scroll { transform:translateY(-100%); }
      &.v_fixed{

      }
      .fixed-box-right{
        .item{
          text-align: left;
          font-size: 0.938rem;
          line-height: 1.467em;
          margin-bottom: 4px;
          .left{
            width:110px;
          }
          div{
            display: inline-block;
          }
          &.total{
            font-weight: bold;
            .right{
              font-size: 1.250rem;
              line-height: 1.250em;
            }
          }
        }
        .checkout-btn{
          margin-top: 24px;
          width: 100%;
          background: #A6A5A3;
          border-radius: 60px;
          height: 43px;
          line-height: 43px;
          color: #FCFCFC;
          cursor: pointer;
          text-align: center;
        }
      }
    }
  }
}
</style>
