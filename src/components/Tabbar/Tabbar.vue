<template>
  <div class="tabbar">
    <ul class="tabbar-menu">
      <router-link to="/home" tag="li">
        <i class="iconfont icon-dianying"></i>
        <p>电影</p>
      </router-link>
      <router-link to="/cinema" tag="li">
        <i class="iconfont icon-dianying"></i>
        <p>影院</p>
      </router-link>
      <router-link to="/profile" tag="li">
        <i class="iconfont icon-my"></i>
        <p>我的</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'Tabbar',
    data() {
      return {
       
      }
    },
  }
</script>

<style lang="scss" scoped>
.tabbar{
  position: fixed;
  bottom:0;
  left:0;
  width: 100%;
  .tabbar-menu{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 3rem;
    background-color:#fff;
    color:#353535;
    li{
      text-align: center;
      padding-top:.2rem;
      i{
        font-size:1.4rem;
      }
      p{
        font-size:.8rem;
      }
      &.router-link-active{
        color:#f46;
        font-weight:600;
      }
    }
  }
}
</style>