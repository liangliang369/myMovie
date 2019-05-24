<template>
  <div class="home">
    <Header title="我的电影"></Header>
    <Links :nm="$store.state.City.nm"></Links>
    <keep-alive>
       <router-view />
    </keep-alive>
    <Tabbar></Tabbar>
    <router-view name="detail" />
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Tabbar from '@/components/Tabbar/Tabbar'
import Links from '@/components/component/Links/Links'
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
  export default {
    name:'Home',
    data() {
      return {
        nm:'',
        id:''
      }
    },
    components:{
      Header,
      Tabbar,
      Links
    },
    methods:{
      show(){
        if(this.$store.state.City.id == this.id){return;}
        MessageBox.confirm('', { 
             message: '当前城市:'+this.nm, 
             title: '定位', 
             confirmButtonText: '切换城市', 
             cancelButtonText: '取消' 
             }).then(action => { 
             if (action == 'confirm') {     //确认的回调
              window.localStorage.setItem('Hotnm',this.nm);
              window.localStorage.setItem('Hotid',this.id);
              window.location.reload();
             }
             }).catch(err => { 
             if (err == 'cancel') {     //取消的回调
             } 
        });
      },
      changeLoation(){
        this.$axios.get('/api/getLocation').then(res=>{
          var status = res.status;
          if(status === 200){
            var nm = res.data.data.nm;
            var id = res.data.data.id;
             this.nm = nm;
             this.id = id;
          }
        }).catch(err=>{
          Toast({
              message: '网络连接错误',
              position: 'middle',
              duration: 3000
            });
        })
      }
    },
    mounted(){
      this.changeLoation();
      setTimeout(this.show,3000)
    }
  }
</script>

<style lang="scss" scoped>
.home{
  .links{
    position: fixed;
    top:3rem;
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
}
</style>