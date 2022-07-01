<template>
  <siteHeader/>
  <router-view></router-view>
  <siteFooter/>
</template>
<script>
import siteHeader from '@/components/header.vue'
import siteFooter from '@/components/footer.vue'

export default {
  name: 'APP',
  components: {
    siteHeader,
    siteFooter
  }
}
</script>
<style lang="scss">
@import './sass/main';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
