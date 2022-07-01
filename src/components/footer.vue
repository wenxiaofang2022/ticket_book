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
      <div class="terms"><a href="https://www.sistic.com.sg/privacy-policy?_ga=2.214638110.86919835.1655912938-2052395521.1648466179">Privacy Policy</a> | <a href="https://www.sistic.com.sg/terms-and-conditions?_ga=2.10860093.86919835.1655912938-2052395521.1648466179">Terms & Conditions</a></div>
      <div class="contact">SISTIC Hotline: <a href="tel:+65 6348 5555">+65 6348 5555</a></div>
      <div class="vession">v1.0.3</div>
    </div>
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
  a{
    color: #fff;
  }
}
</style>
