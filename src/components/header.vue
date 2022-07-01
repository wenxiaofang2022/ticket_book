<template>
  <div class="site-header">
    <nav>
      <router-link to="/" class="left-index">
        <img src="https://alexandracraig.com/sistic/img/logo-ovation.svg"/>
      </router-link>
      <router-link to="/ShopCar" class="right-cart">
        <img src="https://alexandracraig.com/sistic/img/icon-cart.svg"/>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'siteHeader',
  props: {
    msg: String
  }
}
</script>
<style scoped lang="scss">
.site-header{
  height: 65px;
  background: #000;
  color: #fff;
  nav{
    width: 100%;
    height: 100%;
    padding: 0px 30px;
    display: flex;
    justify-content:space-between;
    align-items:center;
  }
  .left-index{
    width: 80px;
    display: block;
    img{
      width: 80px;
    }
  }
  .right-cart{
    width: 22px;
    display: block;
    img{
      width: 22px;
    }
  }
}
</style>
