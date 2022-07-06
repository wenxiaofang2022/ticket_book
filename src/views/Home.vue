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
    <div class="chose-ticket-box" v-if="showHome">
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
              <div class="btn" :class="confirmSeats?'active':''" @click="confirmSeat">Confirm Seats</div>
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
                  <template v-if="ticketsQuantity-calcQuantity(m)>0">
                    <option :value="n" v-for="n in (ticketsQuantity-calcQuantity(m))" :key="'quantity_'+n" >{{n}}</option>
                  </template>
                  <template v-if="ticketsQuantity-calcQuantity(m)==0">

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
            <div class="right">PHP {{_Subtotal}}</div>
          </div>
          <div class="booking-fee item">
            <div class="left">Booking Fee</div>
            <div class="right">PHP {{_BookingFee}}</div>
          </div>
          <div class="total item">
            <div class="left">Total</div>
            <div class="right">PHP {{_Total}}</div>
          </div>
          <div class="checkout-btn" :class="checkoutActive?'active':''" @click="addToCart">Check Out</div>
        </div>
      </div>
    </div>
    <div class="shop-car-container" v-if="showCart">
      <div class="nodata-box" v-if="cartNodata">
        <div class="text">Your shopping cart is empty</div>
        <div class="btn active" @click="goShopping">Continue Shopping</div>
      </div>
      <div class="cart-box" v-if="cartNodata">
        <div class="cart-part">
          <div class="part-tit">Shopping Cart<a class="go-shopping"></a></div>
          <div class="part-content bg-gray">
            <div class="tickets-info">
              <div class="eventName">{{eventName}}</div>
              <div class="venue"><svg-icon class="my-icon" icon="location"/>{{venue}}</div>
              <div class="date"><svg-icon class="my-icon" icon="calendar"/>{{dateDay}} / {{dateTimeDuration}}</div>
            </div>
            <div class="tickets-list">
              <div class="ticket-item" v-for="(item,m) in lineItemList" :key="'ticket_item_'+m">
                <div class="item-row">
                  <div class="label">Ticket Details</div>
                  <div class="content">
                    Level: {{item.product.level}}, Section: {{item.product.section}}<br/>Row: {{item.product.row}}, Seats: {{item.product.seatNo.join(', ')}}
                  </div>
                </div>
                <div class="item-row">
                  <div class="label">Ticket Type</div>
                  <div class="content">{{item.priceclass.priceClassName}}</div>
                </div>
                <div class="item-row">
                  <div class="label">Qty</div>
                  <div class="content">{{item.quantity}}</div>
                </div>
                <div class="item-row">
                  <div class="label">Unit Price</div>
                  <div class="content">{{item.unitPrice.formatted}}</div>
                </div>
                <div class="item-row">
                  <div class="label">Booking Fee</div>
                  <div class="content">{{item.bookingFee.formatted}}</div>
                </div>
                <div class="item-row total">
                  <div class="label">{{item.subTotal.formatted}}</div>
                  <div class="content">
                    <svg-icon class="my-icon" icon="delete"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="part-totalamount">
            <div class="item-row">
              <div class="label">Total Amount</div>
              <div class="content">
                <span class="s_price">{{lineItemTotal.formatted}}</span>
                <span>inclusive of taxes</span>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-part">
          <div class="part-tit">Delivery Method</div>
          <div class="part-desc">Please choose a delivery method</div>
          <div class="part-content"></div>
        </div>
        <div class="cart-part">
          <div class="part-tit">Payment Method</div>
          <div class="part-content"></div>
        </div>
        <div class="cart-part">
          <div class="terms-list" v-if="termsCheckList&&termsCheckList.length>0">
            <div class="terms-item" v-for="(item,m) in termsCheckList" :key="'terms_'+m">
              <div class="part-content terms-content">
                <div class="part-tit">{{item.title}}</div>
                <div class="part-subtit">{{item.subtit}}</div>
                <div class="part-terms-desc">{{item.desc}}</div>
                <div class="part-checkbox" v-if="item.checkobj" @click="changeChecked(m)">
                  <span class="check-box-target" :class="item.checked?'active':''"></span>
                  <span>{{item.checkobj.label}}</span>
                  <template v-if="item.checkobj.item">
                    <a :href="item.checkobj.item.value">{{item.checkobj.item.key}}</a>
                  </template>
                  <span>{{item.checkobj.suffix}}</span>
                </div>
                <div class="part-rules" v-if="item.rulelist&&item.rulelist.length>0">
                  <div class="rule-item" v-for="(tmp,n) in item.rulelist" :key="'terms_rule_'+n">
                    <span class="rule-index">{{n+1}}.</span>{{tmp}}
                  </div>
                </div>
                <div class="part-checkbox no-checkbox" v-if="item._checkobj">
                  <span>{{item._checkobj.label}}</span>
                  <template v-if="item._checkobj.item">
                    <a :href="item._checkobj.item.value">{{item._checkobj.item.key}}</a>
                  </template>
                  <span>{{item._checkobj.suffix}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fixed-timer">
        <div class="s_fixed">
          <div class="s_time">
            <span class="s_icon">
              <svg-icon class="my-icon" icon="timer"/>
            </span>
            <span class="s_timeleft">00:00</span>
          </div>
          <span class="s_text">Time left to complete purchase</span>
        </div>
      </div>
    </div>
    <common-modal :showmoadl="modalShow" type="warning" title="Change Selection" content="Would you like to release your current selection and search again?" @return-action="changeTicketsQuantity"/>
  </div>
</template>

<script>
import staticData from '@/api/test.js';
export default {
  name: 'Home',
  data(){
    return{
      //home
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
      _ticketsQuantity:0,
      selectQuantityObj:[],
      _Subtotal:0,
      _BookingFee:0,
      _Total:0,
      checkoutActive:false,
      inventoryList:[],
      //shopcart
      cartGuid:'',
      expiryTime:'',
      eventName:'',
      venue:'',
      dateDay:'',
      dateTimeDuration:'',
      lineItemList:[],
      lineItemTotal:{},
      deliveryMethodList:[],
      paymentMethodList:[],
      termsCheckList:[
        {
          checked:false,
          title:'Event Terms & Conditions',
          subtit:'Justin Bieber Justic World Tour 2022 - Philippines',
          desc:'All Participants must read, acknowledge and agree to waive, discharge and release from liability. In conseration of my participation in any way in the above event.',
          checkobj:{
            label:'I have read and accept the ',
            item:{
              key:'Terms and Conditions',
              value:'https://www.sistic.com.sg/terms-and-conditions?_ga=2.10860093.86919835.1655912938-2052395521.1648466179'
            }
          }
        },
        {
          checked:false,
          title:'Subscription',
          desc:'I wish to receive marketing information by email from, and agree to the collection, use and disclosure of my personal data for such marketing by:',
          checkobj:{
            label:'SISTIC and its marketing agents for the event(s) purchased and other sales, promotions, discounts, contests, or events by SISTIC',
          }
        },
        {
          checked:false,
          title:'Conditions of Sale, Use or Personal Data',
          checkobj:{
            label:'I have read and accept SISTIC ',
            item:{
              key:'Terms & Conditions',
              value:'https://www.sistic.com.sg/terms-and-conditions?_ga=2.10860093.86919835.1655912938-2052395521.1648466179',
            },
            suffix:' of Sale and consent to:'
          },
          rulelist:[
            'the collection of my personal data by SISTIC both in its own capacity, and as ticketing agent and data intermediary of the promoter(s) and venue manager(s) of the event(s) purchased; and',
            'the collection, use and disclosure of such personal data by SISTIC, its agents and the promoter(s) and venue manager(s),'
          ],
          _checkobj:{
            label:"in accordance with SISTIC's ",
            item:{
              key:'Privacy Policy',
              value:'https://www.sistic.com.sg/privacy-policy?_ga=2.214638110.86919835.1655912938-2052395521.1648466179',
            },
            suffix:'. No refund, exchange of tickets is allowed once your booking is confirmed.'
          },
        }
      ],
      //controll bar
      showHome:false,
      showCart:true,
      cartNodata:true,
    }
  },
  mounted(){
    // this.getDate();
    // this.getSeatData();
    this.geInitData();
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
    //shopcart part
    goShopCart(){
      this.showHome = false;
      this.showCart = true;
      this.geInitData();
    },
    changeChecked(m){
      this.termsCheckList[m].checked = !this.termsCheckList[m].checked;
    },
    geInitData(){
      console.log("staticData",staticData);
      let res = staticData;
      this.eventName = res.data.eventName;
      this.venue = res.data.venue;
      this.dateDay = res.data.dateDay;
      this.dateTimeDuration = res.data.dateTimeDuration;
      this.lineItemList = res.data.lineItemList;
      this.lineItemTotal = res.data.lineItemTotal;
      this.deliveryMethodList = res.data.deliveryMethodList;
      this.paymentMethodList = res.data.paymentMethodList;
      this.expiryTime = res.data.expiryTime;
      return;
      this.$http.getHttp({
        name:'getcart',
        params:{
          api:'getcart',
          cartguid:this.cartGuid,
        }
      },(res,success)=>{
        if(success){
          console.log("res===",res);
          this.eventName = res.data.eventName;
          this.venue = res.data.venue;
          this.dateDay = res.data.dateDay;
          this.dateTimeDuration = res.data.dateTimeDuration;
          this.lineItemList = res.data.lineItemList;
          this.lineItemTotal = res.data.lineItemTotal;
          this.deliveryMethodList = res.data.deliveryMethodList;
          this.paymentMethodList = res.data.paymentMethodList;
          this.expiryTime = res.data.expiryTime;
        }
      })
    },
    goShopping(){
      // this.$router.push({
      //   path: '/'
      // });
    },
    //home part
    goHomePage(){
      this.showHome = true;
      this.showCart = false;
    },
    addToCart(){
      console.log("selectQuantityObj",this.selectQuantityObj);
      console.log("ticketTypeList",this.ticketTypeList);
      let _priceClassMap = [];
      let _inventoryList = [];
      this.ticketTypeList.map((item,index)=>{
        if(this.selectQuantityObj[index].value>0){
          _priceClassMap.push(item.priceClassCode+':'+this.selectQuantityObj[index].value);
        }
      })
      this.inventoryList.map(item=>{
        _inventoryList.push(item.inventoryId);
      })
      this.$http.getHttp({
        name:'addtocart',
        params:{
          api:'addtocart',
          cartGuid:'',
          pid:1722018,
          priceClassMap:_priceClassMap.join(','),
          priceCatId:this.priceCatId,
          seatSectionId:this.seatSectionId,
          mode:this.mode,
          inventoryList:_inventoryList.join(',')
        }
      },(res,success)=>{
        if(success){
          console.log("res===",res);
          this.cartGuid = res.data.cartGuid;
          this.goShopCart();
          // this.$router.push({
          //   path: '/ShopCar/'+res.data.cartGuid+'/'+res.data.expiryTime,
          // });
        }
      })
    },
    calcQuantity(index){
      let val = this.selectQuantityObj[index].value;
      let return_val = 0;
      this.selectQuantityObj.map((item)=>{
        if(item.key!=index){
          return_val = return_val + item.value;
        }
      })
      if(val>0){
        //已经被选择过
        return_val = return_val;
      }
      else{
        //没有被选择过
        return_val = return_val + val;
      }
      console.log("return_val===",return_val);
      return return_val;
    },
    selectTicket(index,e){
      let tmp_val = e.target.value;
      this.selectQuantityObj[index].value = Number(tmp_val);
      console.log("selectQuantityObj",this.selectQuantityObj);
      //计算票价
      this.calcTicketFares();
    },
    calcTicketFares(){
      let _Subtotal = 0;
      let _BookingFee = 0;
      let _Quantity = 0;
      this.selectQuantityObj.map((item,index)=>{
        if(item.value>0){
          let _obj = this.ticketTypeList[index];
          _Subtotal = _Subtotal + Number(_obj.priceValueAmount.amount);
          _BookingFee = _BookingFee + Number(this.calcFee(_obj.feeList));
          _Quantity = _Quantity + Number(item.value);
        }
      })
      if(_Quantity-this.ticketsQuantity==0){
        this.checkoutActive = true;
      }
      else{
        this.checkoutActive = false;
      }
      this._Subtotal = _Subtotal;
      this._BookingFee = _BookingFee;
      this._Total = _Subtotal + _BookingFee;
    },
    calcFee(arr){
      let fee = 0;
      arr.map(item=>{
        fee = fee+Number(item.charge.amount);
      })
      return fee;
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
          this.inventoryList = res.data.setsReservedList[0].setsReserved;
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
          let selectQuantityObj = [];
          res.data.map((item,index)=>{
            selectQuantityObj.push({key:index,value:0});
          })
          this.selectQuantityObj = selectQuantityObj;
          console.log("selectQuantityObj",selectQuantityObj);
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
          this.confirmActive = false;
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
  @import "./home.scss";
  @import "./shopcart.scss";
}
</style>
