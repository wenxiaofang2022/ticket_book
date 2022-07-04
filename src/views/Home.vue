<template>
  <div class="page-home-container page-container">
    <div class="tour-info">
      <img src="@/assets/img/event-thumbnail.jpg"/>
      <div class="s_info">
        <p>Justin Bieber Justic World Tour 2022 - Philippines</p>
        <div class="s_venuedatetime">
            <p class="s_venue v_select">
              <svg-icon class="my-icon" icon="location"/>
              <span>Newport Performing Arts Theatre</span>
            </p>
            <p class="s_datetime">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" xmlns:v="https://vecta.io/nano">
              <path fill-rule="evenodd" d="M3.609 1.864v.364H2.555 1.5v1.093 1.093h6 6V3.322 2.229h-1.055-1.055v-.364V1.5h-.351-.352v.364.364H7.5 4.313v-.364V1.5h-.352-.352v.364zm.703 1.093v.729h-.352-.352v-.729-.729h.352.352v.729zm7.078 0v.729h-.351-.352v-.729-.729h.352.351v.729zM1.5 9.322V13.5h6 6V9.322 5.144h-6-6v4.178zm3.094-2.308v.632h-.621-.621v-.632-.632h.621.621v.632zm2.344 0v.632h-.621-.621v-.632-.632h.621.621v.632zm2.367 0v.632h-.621-.621v-.632-.632h.621.621v.632zm2.344 0v.632h-.621-.621v-.632-.632h.621.621v.632zM4.594 9.213v.644l-.615-.006-.615-.006-.006-.638-.006-.638h.621.621v.644zm2.344 0v.644l-.615-.006-.615-.006-.006-.638-.006-.638h.621.621v.644zm2.362-.006l-.006.638-.615.006-.615.006v-.644-.644h.621.621l-.006.638zm2.344 0l-.006.638-.615.006-.615.006v-.644-.644h.621.622l-.006.638zm-7.049 2.193v.644l-.615-.006-.615-.006-.006-.638-.006-.638h.621.621v.644zm2.344 0v.644l-.615-.006-.615-.006-.006-.638-.006-.638h.621.621v.644zm2.362-.007l-.006.638-.615.006-.615.006v-.644-.644h.621.621l-.006.638zm2.344 0l-.006.638-.615.006-.615.006v-.644-.644h.621.622l-.006.638z" fill="#4a4a4a"/>
              </svg>
              <span></span>
            </p>
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
