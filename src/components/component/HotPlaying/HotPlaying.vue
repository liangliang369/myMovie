<template>
  <div class="hotplaying">
    <Loading v-if="isLoading"></Loading>
    <div class="playing-items" v-else>
      <div class="playing-item" v-for="play in moiveList" :key="play.id">
        <div class="post-img" @click="handleTodetail(play.id)">
          <img :src="play.img | setWH('74.112')" width="100%" alt="">
        </div>
        <div class="movie-info">
          <h4 @click="handleTodetail(play.id)">{{play.nm}}</h4>
          <p class="comment">观众评：<span>{{play.sc}}</span></p>
          <p class="performer">主演：{{play.star}}</p>
          <p>{{play.showInfo}}</p>
        </div>
        <div class="buy">
          <span>购买</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
  export default {
    name:'HotPlaying',
    data() {
      return {
         moiveList:[],
         isLoading:true,
         preveCityId: -1
      }
    },
    methods:{
      getMoive(){
        var cityId = this.$store.state.City.id;
        if(this.preveCityId === cityId){
          return;
        };
        this.isLoading = true;
        this.$axios.get('/api/movieOnInfoList?cityId='+cityId)
        .then(res=>{
          if(res.data.status ===0){
            this.moiveList = res.data.data.movieList;
            this.isLoading = false;
            this.preveCityId = cityId;
          }else{
              Toast({
              message: '影片加载失败',
              position: 'middle',
              duration: 3000
            });
          }
          
        })
        .catch(err=>{
          Toast({
                message: '服务器错误'+err,
                position: 'middle',
                duration: 3000
              });
        })
      },
      handleTodetail(id){
        console.log(id)
        this.$router.push('/home/detail/'+id)
      }
    },
    activated() {
      this.getMoive();
    },
  }
</script>

<style lang="scss" scoped>
.hotplaying{
  .playing-items{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding:.5rem;
    .playing-item{
      display: flex;
      flex-flow: row;
      align-items:flex-start;
      padding-bottom: .2rem;
      border-bottom: 1px solid #eeeeee;
      margin-bottom: .4rem;
      .post-img{
        width: 8rem;
        margin-right:.3rem;
        
      }
      .movie-info{
        width: 100%;
        display: flex;
        flex-flow: column;
        h2{
          font-size: 1rem;
          align-self: flex-start;
        }
        p{
          width: 100%;
          font-size: .8rem;
          margin-bottom:.4rem;
        }
        .comment{
          span{
            color: darkgoldenrod;
            margin-left:.3rem;
          }
        }
        
      }
      .buy{
        width: 5rem;
        background-color: #f00;
        font-size: .8rem;
        align-self: center;
        color: #fff;
        border-radius: .2rem;
        span{
          display: block;
          padding: .4rem 0;
           text-align: center;
        }
      }
    }
  }
}
</style>