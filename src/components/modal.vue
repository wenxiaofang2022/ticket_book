<template>
<section class="c__dialog" v-if="showmoadl">
  <article class="s_content">
      <figure>
        <svg-icon class="my-icon" icon="warning"/>
      </figure>
      <h3>{{title}}</h3>
      <p>{{content}}</p>
      <article class="u__ctas v_col">
          <div class="s_pri v_outline" @click="modalClick(false)">Cancel</div>
          <div class="s_pri" @click="modalClick(true)">Ok</div>
      </article>
  </article>
</section>
</template>

<script>
export default {
    props:{
      showmoadl:{
        type: Boolean,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      title:{
        type: String,
        required: true
      },
      content:{
        type: String,
        required: true
      }
    },
    methods:{
        modalClick(res){
          console.log(res);
            this.$emit('return-action',res);
        }
    }
}
</script>

<style lang='scss'>
.c__dialog{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100000;
  backdrop-filter: blur(2px) saturate(150%);
  &:after {
    content: '';
    display: block;
    background: #000;
    opacity: 0.75;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  .s_content{
    background: #FFF;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 28px);
    max-width: 595px;
    padding: 28px 14px 30px;
    text-align: center;
    figure{
      width: 36px;
      margin: 0 auto;
      .svg-icon{
        width: 36px;
        height: 36px;
      }
    }
    h3{
      margin-top: 5px;
      margin-bottom: -1px;
      font-family: 'Agency FB';
      font-size: 1.875rem;
      font-weight: 400;
    }
    p{
      font-size: 0.938rem;
      line-height: 1.467em;
    }
    .u__ctas{
      margin-top: 24px;
      display: flex;
      width: calc(100% + 16px);
      position: relative;
      transform: translateX(-8px);
      .s_pri{
        width: calc(50% - 16px);
        margin: 0 8px;
        border: none;
        display: block;
        width: 100%;
        height: 43px;
        line-height: 43px;
        font-size: 0.938rem;
        text-decoration: none;
        text-align: center;
        border-radius: 60px;
        box-sizing: border-box;
        color: #FCFCFC;
        background: #151009;
        cursor: pointer;
        &.v_outline{
          border: 1px solid #151009;
          background: #FCFCFC;
          color: #151009;
        }
      }
    }
  }
}
</style>