<template>
  <div>
    <div class="search-wrap">
      <div class="search-box">
        <mt-search
          v-model="keyWords"
          cancel-text="取消"
          placeholder="搜索">
        </mt-search>
      </div>
      <div class="search-content">
        <div class="search-title">
          <h4>电影/电视剧/综艺</h4>
        </div>
        <div class="search-list" v-for="item in searchList" :key="item.id">
          <div class="search-img">
            <img :src="item.img | setWH(72.112)" width="100%" alt="">
          </div>
          <div class="movie-text">
            <h4>{{item.nm}}</h4>
            <span>{{item.enm}}</span>
            <p>{{item.cat}}</p>
            <span>{{item.rt}}</span>
          </div>
          <span class="fen">{{item.sc}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
  export default {
    name:'Search',
    data() {
      return {
        keyWords:'',
        searchList:[]
      }
    },
    methods:{
      cancelRequest(){
          if(typeof this.source ==='function'){
              this.source('终止请求')
          }
      }
    },
    watch:{
      keyWords(newVal){
        this.cancelRequest();
        var that = this;
        var cityId = this.$store.state.City.id;
          this.$axios.get('/api/searchList?cityId='+ cityId +'&kw='+newVal,{
            cancelToken: new this.$axios.CancelToken(function executor(c) {
                that.source = c;
            })
          })
          .then(res=>{
            if(res.data.status === 0 && res.data.data.movies){
              this.searchList = res.data.data.movies.list;
            }else{
              Toast({
                message: '影片搜索失败',
                position: 'middle',
                duration: 3000
              });
            }
          })
          .catch(err=>{
             if (this.$axios.isCancel(err)) {
                  console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
              } else {
                  //handle error
                   Toast({
                        message: '网络连接错误'+err,
                        position: 'middle',
                        duration: 3000
                    });
              }
           
          })
        }
      }
  }
</script>

<style lang="scss" scoped>
.search-box{
  height:2.8rem;
  .mint-search{
     height:2.8rem;
    .mint-searchbar-inner .mintui-search {
        font-size: 20px;
        color: #d9d9d9;
    }
  }
}

.search-content{
  .search-title{
    height: 2.8rem;
    line-height: 2.8rem;
    background-color: #fff;
    padding:0 .6rem;
    margin-bottom:.1rem;
  }
  .search-list{
    display: flex;
    flex-flow: row;
     padding:.6rem;
     border-bottom: 1px solid #eeeeee;
     background-color: #fff;
    .search-img{
      width: 8rem;
      margin-right: .6rem;
    }
    .movie-text{
      width: 100%;
      display: flex;
      flex-flow: column;
      h4{
        font-size: 1rem;
      }
      p{
        font-size: .8rem;
      }
      span{
         font-size: .8rem;
      }
      span,p{
        margin-top:.4rem;
      }
    }
    .fen{
     width: 4rem;
     color: #f46;
    }
  }
}
</style>