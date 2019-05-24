<template>
  <div>
    <Header title="个人中心"></Header>
    <div class="from-box">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-button type="danger" size="large">登录</mt-button>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Tabbar from '@/components/Tabbar/Tabbar'
  export default {
    name:'Profile',
    data() {
      return {
        username:'',
        password:''
      }
    },
    components:{
      Header,
      Tabbar
    }
  }
</script>

<style lang="scss" scoped>

</style>