<template>
  <div class="header">
      <header>
        <slot></slot>
        <h2>{{title}}</h2>
      </header>
  </div>
</template>

<script>
  export default {
    name:'Header',
    props:{
      title:{
        type:String,
        default:'喵喵电影'
      }
    }
  }
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top:0;
  left:0;
  z-index:100;
  width: 100%;
  header{
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    background-color: #f46;
    text-align: center;
    color:#fff;
  }
}
</style>