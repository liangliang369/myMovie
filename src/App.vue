<template>
  <div id="app">
    <div class="mask-banner" v-if="flag">
      <span class="go-home" @touchstart="goHome">{{num}}秒&nbsp;{{jumpText}}</span>
    </div>
      <keep-alive>
        <router-view/>
      </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      jumpText:'跳过',
      num:5,
      flag:true,
      Timer:null
    }
  },
  methods:{
    goHome(){
      this.flag = false;
    },
    play(){
      this.Timer = setInterval(this.autoplay,1000);
    },
    autoplay(){
      this.num--;
      if(this.num ===0){
        this.flag = false;
        clearInterval(this.Timer);
      }
    }

  },
 created(){
    this.play();
  }
}
</script>

<style lang="scss">
html,body{
  width: 100%;
  height:100%;
}
body{
  background-color: #f6f6f6;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding:5.5rem 0 3rem 0;
}
.mask-banner{
  position: fixed;
  top:0;
  left:0;
  z-index: 102;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  background: url('./assets/banner.jfif')no-repeat;
  background-size: cover;
  .go-home{
    position: absolute;
    top:1.25rem;
    right:.625rem;
    font-size: .9rem;
    padding:.5rem .75rem;
    color: #fff;
    background-color: rgba(0,0,0,.5);
    border-radius: .4rem;
  }
}
.v-enter{
  opacity: 0;
  /* transform: translateX(100%); */
}
.v-leave-to{
  opacity: 0;
  /* transform: translateX(-100%); */
}
.v-enter-active,.v-leave-active{
  transition: all 1s ease;
}
</style>
