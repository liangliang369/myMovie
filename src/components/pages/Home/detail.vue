<template>
  <div class="detail-wrap" :style="{'background':detailMovie.backgroundColor}">
   
    <Loading v-if="isLoading"></Loading>
    <div v-else>
      <mt-header fixed title="影片详情" :class="{'background':detailMovie.backgroundColor}">
          <span slot="left"  @touchstart="handleToBack">
            <mt-button icon="back">返回</mt-button>
          </span>
      </mt-header>
      <div class="movie-content">
        <div class="movie-mesg">
          <!-- 影片海报图片 -->
          <div class="movie-post">
            <img :src="detailMovie.img | setWH('74.112')" width="100%" height="100%"  alt="">
          </div>
          <!-- 影片海报介绍 -->
          <div class="movie-text">
            <h4>{{detailMovie.nm}}</h4>
            <p>{{detailMovie.enm}}</p>
            <p>{{detailMovie.cat}}</p>
            <p class="over">{{detailMovie.star}}</p>
            <p>{{detailMovie.pubDesc}}/{{detailMovie.dur}}分钟</p>
          </div>
        </div>
        <!-- 影片评分 -->
        <div class="movie-rating">
            <!-- 想看人数 -->
            <div class="watched">
              <span class="logo"><i class="iconfont icon-maoyandianying"></i>实时口碑</span>
              <div class="watched-num">
                <span>{{detailMovie.wish}}想看</span>
                <span>{{detailMovie.watched}}看过</span>
              </div>
            </div>
            <!-- 评分 -->
            <div class="rating-box">
              <div class="rating-num">
                <p v-for="(rating,index) in detailMovie.distributions" :key="index">
                  <mt-progress :value="Number(rating.proportion)">
                    <div slot="start">{{rating.proportion}}</div>
                    <div slot="end">{{rating.movieScoreLevel}}</div>
                  </mt-progress>
                </p>
              </div>
              <!-- 综合评分 -->
                <div class="synthesize">
                  <p>{{detailMovie.sc}}</p>
                  <p>{{detailMovie.snum}}人评</p>
                </div>
            </div>
        </div>
        <!-- 简介 -->
        <div class="brief">
          <div class="top">
            <h4>简介</h4>
            <span @touchstart="toggle">展开<i class="iconfont icon-xiala"></i></span>
          </div>
          <div :class="[{over:isOver},'drief-cont']">
            {{detailMovie.dra}}
          </div>
        </div>
        <!-- 演员人员 -->
        <div class="performer">
          <div class="top">
            <h4>演员人员</h4>
            <span @touchstart="toggle">全部{{detailMovie.photos.length}}人<i class="iconfont icon-xiala1"></i></span>
          </div>
          <div class="sw-list">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(per,index) in detailMovie.photos" :key="index">
                <div class="sw-item">
                  <img :src="per | setWH('74.112')" alt="">
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <!-- 视频剧照 -->
        <div class="video-Stills">
          <div class="top">
            <h4>视频剧照</h4>
            <span @touchstart="toggle">全部{{detailMovie.photos.length}}张<i class="iconfont icon-xiala1"></i></span>
          </div>
          <div class="sw-list">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(stills,index) in detailMovie.photos" :key="index">
                <div class="sw-item">
                  <img :src="stills | setWH('74.112')" alt="">
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name:'Detail',
    data() {
      return {
        detailMovie:{},
        isOver:true,
        value:0,
        isLoading:true,
        swiperOption:{
          slidesPerView : 4,
          freeMode : true,
          freeModeSticky:true
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    props:['id'],
    methods:{
      handleToBack(){
        this.$router.back();
        console.log('back')
      },
      getDetailData(){
        this.$axios.get('/api/detailmovie?movieId='+this.id)
        .then(res=>{
          if(res.status === 200 ){
            this.detailMovie = res.data.data.detailMovie;
            this.isLoading = false;
            console.log( this.detailMovie)
          }
        })
        .catch(err=>{
          console.log(err);
        })
      },
      toggle(){
        this.isOver = !this.isOver;
      }
    },
    mounted(){
      this.getDetailData();
    }
  }
</script>

<style lang="scss" scoped>
.detail-wrap{
  position: absolute;
  top:0;
  left:0;
  z-index: 101;
  width: 100%;
  min-height:100%;
  background-color: #316266;
  padding-top:40px;
  .mint-header{
    background-color:rgba(255,255,255,.4);
  }
  .movie-content{
    padding:.6rem;
    .top{
       height:1.25;
       display: flex;
       flex-direction: row;
       align-items: center;
       justify-content: space-between;
       h4{
         color:#fff;
       }
       span{
         color:#A9A9A9;
         font-size: .75rem;
       }
     }
    .movie-mesg{
      display: flex;
      flex-direction: row;
      .movie-post{
        width:4.5rem;
        height:7rem;
        margin-right: .6rem;
        border-radius: .2rem;
        img{
          border-radius: .2rem;
        }
      }
      .movie-text{
        flex: 1;
        h4{
          color:#fff;
        }
        p{
          color:#A9A9A9;
          font-size: .75rem;
          margin:.3rem 0;
          overflow:hidden; 
          text-overflow:ellipsis;
          display:-webkit-box; 
          -webkit-box-orient:vertical;
          -webkit-line-clamp:1; 
        }
      }
    }
    // 评分
    .movie-rating{
      height: auto;
      padding:.4rem;
      background-color:rgba(0,0,0,.4);
      border-radius: .2rem;
      margin:1.25rem 0 1.15rem 0;
      color:#A9A9A9;
      .watched{
        display: flex;
        justify-content: space-between;
        font-size: .75rem;
        i{
          background-color:	#FF4500;
          border-radius: 50%;
          margin-right: .4rem;
        }
        .logo{
          font-size: .9rem;
          font-weight: 600;
          color:#fff;
        }
      }
      .rating-box{
        display: flex;
        height: auto;
        flex-direction: row;
        // min-height: 5.125rem;
        margin-top:.6rem;
        .rating-num{
          flex: 1;
          font-size: .75em;
          .mt-progress{
            height:.9rem;
            line-height: .9rem;
            .mt-progress-progress{
              background-color: #FFD700 !important;
            }
          }
          .mt-progress-content{
              margin-left:.4rem;
               margin-right:.4rem;
            }
        }
        .synthesize{
          width: 30%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-content: space-between;
          text-align: center;
          p:nth-child(1){
            font-size: 1.2rem;
            color:	#FFD700;
          }
          p:nth-child(2){
            font-size: .75rem;
            color:	#A9A9A9;
          }
        }
        
      }
    }
    // 简介
    .brief{
     .drief-cont{
       margin-top:.4rem;
       font-size: .85rem;
       color:#fff;
       line-height: 1.25rem;
     }
     .drief-cont.over{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
     }
    }
    // 演员人员
    .performer{
      margin:1.2rem 0 1.2rem 0;
      padding-bottom: .85rem;
      border-bottom:1px solid #A9A9A9;
    }
    .sw-list{
      margin-top:.5rem;
      .swiper-slide{
        margin-right:.3rem;
      }
      .sw-item{
        width: 99%;
        height:2.5rem;
        font-size: .85rem;
        text-align: center;
        img{
          width: 100%;
          height: 100%;
        }
        p{
          // margin-top:.4rem;
          color:#DCDCDC;
        }
      }
    }
    // 视频剧照
    
  }
}
</style>