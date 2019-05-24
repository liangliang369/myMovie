<template>
  <div>
    <ul class="links">
      <router-link to="/home/citylist" tag="li">
        <span>{{nm}}<i class="iconfont">&#xe603;</i></span>
      </router-link>
      <router-link to="/home/hotplaying" tag="li">
        <span>正在热映</span>
      </router-link>
      <router-link to="/home/comingsoon" tag="li">
        <span>即将上映</span>
      </router-link>
      <router-link to="/home/search" tag="li">
        <span>
          <i class="iconfont">&#xe639;</i>
        </span>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'Links',
    props:["nm"]
  }
</script>

<style lang="scss" scoped>
.links{
    position: fixed;
    top:2.5rem;
    left:0;
    z-index:100;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content:space-around;
    height:3rem;
    background-color: #fff;
    li{
      height: 100%;
      line-height: 3rem;
      font-size: .8rem;
      text-align: center;
      color:#353535;
      font-weight: 500;
      &.router-link-active{
        font-weight: bold;
        color:#f46;
        border-bottom: 2px solid #f46;
      }
      span{
        &:nth-child(1){
          i{
            vertical-align: middle;
          }
        }
      }
      i{
        font-size: 1.4rem;
      }
    }
  }
</style>