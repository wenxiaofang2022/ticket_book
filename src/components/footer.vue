<template>
  <div class="site-footer">
    <div class="help-links">
      <div class="tit">Helpful Links</div>
      <div class="link-list">
        <a target="_blank" href="https://www.sistic.com.sg/faq/top-questions?_ga=2.48043566.86919835.1655912938-2052395521.1648466179">FAQ</a>
        <a target="_blank" href="https://www.sistic.com.sg/faq/cancellation-refunds?_ga=2.48043566.86919835.1655912938-2052395521.1648466179">Cancellations/Refunds</a>
      </div>
    </div>
    <div class="copyright-info">
      <div class="copyright">
        <img src="https://alexandracraig.com/sistic/img/logo-stix.png"/>
        <div>Copyright 1998 - 2022. © SISTIC.com Pte Ltd</div>
      </div>
      <div class="right-info">
        <div class="terms"><a href="https://www.sistic.com.sg/privacy-policy?_ga=2.214638110.86919835.1655912938-2052395521.1648466179">Privacy Policy</a> | <a href="https://www.sistic.com.sg/terms-and-conditions?_ga=2.10860093.86919835.1655912938-2052395521.1648466179">Terms & Conditions</a></div>
        <div class="contact">SISTIC Hotline: <a href="tel:+65 6348 5555">+65 6348 5555</a></div>
      </div>
    </div>
    <div class="version">v1.0.3</div>
  </div>
</template>

<script>
export default {
  name: 'siteFooter',
  props: {
    msg: String
  }
}
</script>
<style scoped lang="scss">
.site-footer{
  background: #000;
  color: #fff;
  height: 358px;
  text-align: left;
  padding: 35px 30px 20px;
  a{
    color: #fff;
  }
  .help-links{
    .tit{
      font-family: 'Agency FB';
      font-weight: 400;
      font-size: 1.250rem;
      line-height: 1.250em;
      margin-bottom: 11px;
    }
    .link-list{
      a{
        display: block;
        margin-bottom: 5px;
        font-size: 0.938rem;
        line-height: 1.467em;
        text-decoration: none;
      }
    }
  }
  .copyright-info{
    border-top: 1px solid #ACACAC;
    margin-top: 25px;
    padding-top: 30px;
    font-size: 0.813rem;
    line-height: 1.923em;
    display: flex;
    justify-content: space-between;
    .copyright{
      white-space: nowrap;
      img{
        height: 25px;
        vertical-align: middle;
        margin-right: 14px;
      }
      div{
        display: inline-block;
      }
    }
    .right-info{
      display: flex;
      margin-left: auto;
      .terms{
        margin-left: 25px;
      }
      .contact{
        margin-left: 25px;
      }
    }
  }
  .version{
    padding-top: 15px;
  }
}
</style>
