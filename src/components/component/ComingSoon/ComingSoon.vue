<template>
  <div>
    <Loading v-if="isLoading"></Loading>
     <div class="playing-items" v-else>
       <div class="playing-item" v-for="play in comingList" :key="play.id">
        <div class="post-img">
          <img :src="play.img | setWH(74.112)" @click="handleTodetail(play.id)" width="100%" alt="">
        </div>
        <div class="movie-info">
          <h4 @click="handleTodetail(play.id)">{{play.nm}}</h4>
          <p class="comment">观众评：<span>{{play.sc}}</span></p>
          <p class="performer">主演：{{play.star}}</p>
          <p>{{play.showInfo}}</p>
        </div>
        <div class="buy">
          <span>预告</span>
        </div>
       </div>
      </div>
  </div>
</template>

<script>
  export default {
    name:'ComingSoon',
    data() {
      return {
        comingList:[],
        isLoading:true,
        prevCityid:-1
      }
    },
    methods:{
      getComing(){
        var cityId = this.$store.state.City.id;
        if(this.prevCityid === cityId){return;}
        this.isLoading = true;
        this.$axios.get('/api/movieComingList?cityId='+cityId)
        .then(res=>{
          console.log(res);
          if(res.data.status ===0){
            this.comingList = res.data.data.comingList;
            this.isLoading = false;
              this.prevCityid = cityId;
          }
          
        })
        .catch(err=>{
          console.log(err)
        })
      },
      handleTodetail(id){
        console.log(id)
        this.$router.push('/home/detail/'+id)
      }
    },
    activated(){
      this.getComing();
    }
  }
</script>

<style lang="scss" scoped>
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
          margin:.4rem 0;
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
        background-color: skyblue;
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
</style>