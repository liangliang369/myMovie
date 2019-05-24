<template>
  <div id="app">
      <keep-alive>
        <router-view/>
      </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
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
