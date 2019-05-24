<template>
  <div class="cinema-wrap">
    <Header title="我的影院"></Header>
    <div class="cinema-nav">
      <ul class="links">
        <router-link to="/home/citylist" tag="li">
          <span>全城<i class="iconfont">&#xe670;</i></span>
        </router-link>
        <router-link to="/home/citylist" tag="li">
          <span>品牌<i class="iconfont">&#xe670;</i></span>
        </router-link>
        <router-link to="/home/citylist" tag="li">
          <span>特色<i class="iconfont">&#xe670;</i></span>
        </router-link>
      </ul>
    </div>
    <Loading v-if="isLoading"></Loading>
    <!-- 影院信息列表 -->
    <ul class="cinema-infos" v-else>
      <li class="cinema-item" v-for="cinema in cinemaInfos" :key="cinema.id">
        <h4>{{cinema.nm}}<span>{{cinema.sellPrice}}</span><span>元起</span></h4>
        <div class="address">
          <p>{{cinema.addr}}</p>
          <p>{{cinema.distance}}</p>
        </div>
        <div class="card">
          <span v-for="(num, key) in cinema.tag" v-if="num===1" :key="key" :class="key | classCard">{{key | formtCard }}</span>
        </div>
      </li>
    </ul>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Tabbar from '@/components/Tabbar/Tabbar'
import { Toast } from 'mint-ui'
  export default {
    name:'Cinema',
    data() {
      return {
        cinemaInfos:[],
        isLoading:true,
        preveCityId:-1
      }
    },
    components:{
      Header,
      Tabbar
    },
    methods:{
      getCinemaInfo(){
        var cityId = this.$store.state.City.id;
        if(this.preveCityId === cityId){
          return;
        };
        this.isLoading = true;
        this.$axios.get('/api/cinemaList?cityId='+cityId)
        .then(res=>{
          if(res.status === 200){
            this.cinemaInfos = res.data.data.cinemas;
            this.isLoading = false;
            this.preveCityId = cityId;
          }else{
            Toast({
              message: '数据获取失败',
              position: 'middle',
              duration: 3000
            });
          }
        })
      }
    },
    activated(){
      this.getCinemaInfo();
    },
    filters:{
      formtCard(key){
        var card =  [
          { key:'allowRefund',value:'允许退款' },
          { key:'endorse',value:'打折扣' },
          { key:'sell',value:'小吃' }
        ];
        for(var i=0;i<card.length;i++){
          if(card[i].key === key){
            return card[i].value;
          }
        }
        return '';
      },
      classCard(key){
        var card =  [
          { key:'allowRefund',value:'al' },
          { key:'endorse',value:'ob' },
          { key:'sell',value:'bl' }
        ];
        for(var i=0;i<card.length;i++){
          if(card[i].key === key){
            return card[i].value;
          }
        }
        return '';
      }
    }
  }
</script>

<style lang="scss" scoped>
.cinema-wrap{
  background-color: #fff;
}
.cinema-nav{
  border-bottom:1px solid #f6f6f6;
  .links{
    position: fixed;
    top:2.5rem;
    left:0;
    z-index:2;
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
.cinema-infos{
  width: 95%;
  margin:0 auto;
  background-color:#fff;
  .cinema-item{
    width: 100%;
    background-color: #fff;
    padding:.4rem 0;
    border-bottom: 1px solid #eeeeee;
    h4{
      font-size: 1rem;
      span{
        color: #f46;
        font-weight: 500;
        margin-left: .4rem;
        &:last-child{
          font-size:.8rem;
        }
      }
    }
    .address{
      display: flex;
      align-items: center;
      width: 100%;
      margin:.4rem 0;
      p{
        color: #999;
        &:first-child{
          width: 75%;
           font-size:.9rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        };
        &:last-child{
          width: 25%;
          text-align: end;
          font-size:.8rem;
        }
      }
    }
    .card{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      span{
        padding:.1rem .2rem;
        margin-left:.2rem;
        font-size:.85rem;
        border-radius:.4rem;
      }
      .ob{
        color:burlywood;
        border:1px solid burlywood;;
      }
      .bl{
        color:skyblue;
        border:1px solid skyblue;
      }
      .al{
        color:rgb(181, 224, 192);
        border:1px solid rgb(181, 224, 192);
      }
    }
  }
}
</style>