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
            <div class="btn" :class="confirmActive?'active':''" @click="confirmAct">Confirm Section</div>
          </div>
        </div>
        <div v-if="seatAllocation">
          <div class="select-tit notfirst">Select Seat Allocation</div>
          <div class="ticket-info">
            <div class="info-left">
              <div class="label">Category:</div>
              <div class="value">{{Category}}</div>
            </div>
            <div class="info-right">
              <div class="label">Section:</div>
              <div class="value">{{Section}}</div>
            </div>
          </div>
          <div class="select-list">
            <div class="select-item">
              <div class="label">How many tickets would you like?</div>
              <select @change="choseQuantity">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
          <div class="seat-info" v-if="showSeatInfo">
            <div class="seat-notice" v-if="seatNotice">{{seatNotice}}</div>
            <h4 class="seat-tit" v-if="seatListing&&seatListing.length>0">Seat(s) assigned:</h4>
            <div class="s_ticketsinfo" v-if="seatListing&&seatListing.length>0">
              <div class="s_item" v-for="(item,m) in seatListing" :key="'ticket_seat_'+m">
                Row {{item.seatRowAlias}},Seat: {{item.seatAlias[0]}}<span v-if="item.seatAlias[1]">,{{item.seatAlias[1]}}</span>
              </div>
            </div>
            <div class="confirm-btn">
              <div class="active btn" :class="confirmSeats?'active':''" @click="confirmSeat">Confirm Seats</div>
            </div>
          </div>
          <div class="select-tit notfirst" v-if="!confirmSeats&&ticketTypeList.length>0">Select Ticket Type</div>
          <div class="s_tickettypes" v-if="!confirmSeats&&ticketTypeList.length>0">
            <div class="s_tickettype" v-for="(item,m) in ticketTypeList" :key="'ticket_type_'+m">
              <div class="type_detail">
                <span>{{item.priceClassAlias}}</span>
                <span class="s_help">
                  <span class="s_helpinfo">{{item.priceClassDescription}}</span>
                </span>
                <span class="s_price">{{item.priceValueAmount.formatted}}</span>
              </div>
              <div class="type_select">
                <div class="s_label">No. of Tickets</div>
                <select class="s_select" @change="selectTicket(m,$event)">
                  <option value="0">0</option>
                  <template v-if="ticketsQuantity-selectQuantity>0">
                    <option :value="n" v-for="n in (ticketsQuantity-selectQuantity)" :key="'quantity_'+n" >{{n}}</option>
                  </template>
                  <template v-if="ticketsQuantity-selectQuantity==0&&unselectedIndex.indexOf(m)==-1">
                    <template v-for="(selected) in selectedIndex">
                      <template v-if="selected.key==m">
                        <template v-for="n in selected.value" :key="'quantity_'+n">
                          <option :value="n" selected v-if="n==selected.value">{{n}}</option>
                          <option :value="n" v-else>{{n}}</option>
                        </template>
                      </template>
                    </template>
                  </template>
                </select>
              </div>
            </div>
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
    <common-modal :showmoadl="modalShow" type="warning" title="Change Selection" content="Would you like to release your current selection and search again?" @return-action="changeTicketsQuantity"/>
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
      confirmSeats:true,
      ticketTypeList:[],
      Category:null,
      Section:null,
      seatAllocation:false,
      showSeatInfo:false,
      modalShow:false,
      seatNotice:null,
      seatListing:[],
      seatSectionId:null,
      priceCatId:null,
      mode:null,
      ticketsQuantity:0,
      selectQuantity:0,
      tmpList:[],
      selectedIndex:[],
      unselectedIndex:[],
      _ticketsQuantity:0,
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
    selectTicket(index,e){
      let tmp_key = index;
      let tmp_val = e.target.value;
      let tmp_obj = {key:tmp_key,value:tmp_val};

      let selectedIndex = this.selectedIndex;
      let selectQuantity = 0;
      let unselectedIndex = [];
      let tmpList = this.tmpList;

      if(tmpList.indexOf(tmp_key)>-1){
        selectedIndex.map(item=>{
          if(item.key==tmp_key){
            item.value = tmp_val;
          }
        })
      }
      else{
        tmpList.push(tmp_key);
        selectedIndex.push(tmp_obj);
      }

      console.log("tmpList",tmpList);
      console.log("selectedIndex",selectedIndex);

      let len = this.ticketTypeList.length;
      for(let x=0;x<len;x++){
        console.log("x",x);
        if(tmpList.indexOf(x)==-1){
          unselectedIndex.push(x);
        }
      }

      selectedIndex.map(item=>{
        console.log("item===",item);
        selectQuantity = Number(selectQuantity)+Number(item.value);
      })
      console.log("unselectedIndex",unselectedIndex);
      console.log("selectQuantity",selectQuantity);

      this.tmpList = tmpList;
      this.unselectedIndex = unselectedIndex;
      this.selectedIndex = selectedIndex;
      this.selectQuantity = selectQuantity;
    },
    choseQuantity(e){
      this.modalShow = true;
      this._ticketsQuantity = e.target.value;
    },
    changeTicketsQuantity(res){
      if(res){
        this.ticketsQuantity = this._ticketsQuantity;
        this.selecTicketsNum();
        this.modalShow = false;
      }
      else{
        this.modalShow = false;
      }
    },
    selecTicketsNum(){
      this.$http.getHttp({
        name:'getSeatOffer',
        params:{
          api:'getSeatOffer',
          pid:1722018,
          qty:this.ticketsQuantity,
          priceCatId:this.priceCatId,
          seatSectionId:this.seatSectionId,
          mode:this.mode
        }
      },(res,success)=>{
        if(success){
          console.log("res===",res);
          this.seatAllocation = true;
          this.seatNotice = res.data.seatNotice;
          this.seatListing = res.data.seatListing;
          this.showSeatInfo = true;
        }
        else{
          this.seatNotice = 'There are currently no tickets available for this category or section. Kindly select another section.';
        }
      })
    },
    confirmSeat(){
      if(!this.confirmSeats)return;
      this.$http.getHttp({
        name:'getTicketType',
        params:{
          api:'getTicketType',
          pid:1722018,
          priceCatId:this.priceCatId
        }
      },(res,success)=>{
        if(success){
          console.log("res===",res);
          this.ticketTypeList = res.data;
          this.confirmSeats = false;
        }
      })
    },
    confirmAct(){
      if(!this.confirmActive)return;
      this.$http.getHttp({
        name:'getSeatSectionAvailability',
        params:{
          api:'getSeatSectionAvailability',
          pid:1722018,
          seatSectionId:this.seatSectionId
        }
      },(res,success)=>{
        if(success){
          console.log("res===",res);
          this.seatAllocation = true;
        }
      })
    },
    choseSeat(e){
      console.log(e.target.value);
      let index = e.target.value;
      if(index>-1){
        this.subSectionList = this.seatSectionList[index].seatSectionList;
        this.Category = this.seatSectionList[index].priceCatAlias;
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
        this.seatSectionId = this.subSectionList[index].seatSectionId;
        this.priceCatId = this.subSectionList[index].priceCategoryId;
        this.Section = this.subSectionList[index].seatSectionAlias;
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
          this.mode = res.data.mode.includes('HS') ? 'HS':'BA';
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
        &.notfirst{
          margin-top: 49px;
        }
      }
      .s_tickettypes{
        background: #F5F5F5;
        box-sizing: border-box;
        padding: 15px 14px 30px;
        .s_tickettype{
          margin-top: 25px;
          &:nth-child(1){
            margin-top: 19px;
          }
          .type_detail{
            display: flex;
            align-items: center;
            font-family: 'Agency FB';
            font-weight: 400;
            font-size: 1.250rem;
            line-height: 1.250em;
            .s_help{
              display: inline-block;
              width: 15px;
              height: 15px;
              background: url('@/assets/img/icon-help.svg') center bottom no-repeat;
              background-size: 15px;
              margin-left: 5px;
              position: relative;
              cursor: pointer;
              .s_helpinfo{
                position: absolute;
                top: -12px;
                left: 25px;
                background: #151009;
                color: #FCFCFC;
                font-family: 'Rubik', sans-serif;
                font-weight: 300;
                font-size: 0.750rem;
                line-height: 1.417em;
                width: 165px;
                box-sizing: border-box;
                padding: 11px 14px;
                cursor: pointer;
                display: none;
                &::after {
                  content:'';
                  display:block;
                  position:absolute;
                  top:12px;
                  left:-8px;
                  width:0;
                  height:0;
                  border-top:7px solid transparent;
                  border-bottom:7px solid transparent;
                  border-right:10px solid #151009;
                }
              }
              &:hover{
                .s_helpinfo{
                  display: block;
                }
              }
            }
            .s_price{
              font-family: 'Rubik', sans-serif;
              font-size: 0.938rem;
              line-height: 1.467em;
              font-weight: 300;
              padding-left: 8px;
            }
          }
          .type_select{
            margin-top: 6px;
            .s_label{
              font-size: 0.813rem;
              line-height: 1.385em;
              color: #4A4A4A;
            }
            .s_select{
              margin-top: -4px;
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
      }
      .ticket-info{
        background: #F5F5F5;
        box-sizing: border-box;
        padding: 16px 14px;
        display: flex;
        margin-top: 20px;
        margin-bottom: 23px;
        .info-left,.info-right{
          font-size: 0.813rem;
          line-height: 1.385em;
          color: #4A4A4A;
          width: 50%;
          .label{
            font-weight: bold;
          }
        }
      }
      .seat-info{
        background: #F5F5F5;
        box-sizing: border-box;
        padding: 0 14px 25px;
        margin-top: 30px;
        .seat-notice{
          background: #FA3550;
          width: calc(100% + 28px);
          transform: translateX(-14px);
          box-sizing: border-box;
          padding: 15px 14px;
          font-size: 0.938rem;
          line-height: 1.467em;
          color: #FCFCFC;
          font-weight: 600;
          // margin-bottom: -25px;
        }
        .seat-tit{
          padding-top: 22px;
          font-family: 'Agency FB';
          font-weight: 400;
          font-size: 1.250rem;
          line-height: 1.250em;
        }
        .s_ticketsinfo{
          margin-top: 9px;
          margin-bottom: -1px;
          .s_item{
            font-weight: bold;
          }
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
