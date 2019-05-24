<template>
  <div class="city-list">
    <Loading v-if="isLoading"></Loading>
    <div v-else ref="city_body">
      <div class="hot-city-box">
        <h4>热门城市</h4>
        <ul class="hot-citys">
          <li v-for="hot in hotList" :key="hot.id" @click="handToCity(hot.nm,hot.id)">{{hot.nm}}</li>
        </ul>
      </div>
      <mt-index-list>
        <mt-index-section :index="city.index" v-for="city in cityList" :key="city.id">
          <mt-cell :title="item.nm" v-for="item in city.list" @click.native="handToCity(item.nm,item.id)" :key="item.id"></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Toast } from 'mint-ui'
  export default {
    name:'CityList',
    data() {
      return {
        cityList:[],
        hotList:[],
        isLoading:true
      }
    },
    methods:{
      getCityList(){
        var cityList = window.localStorage.getItem('cityList');
         var hotList = window.localStorage.getItem('hotList');
         if(cityList && hotList){
           this.cityList = JSON.parse(cityList);
           this.hotList = JSON.parse(hotList);
           this.isLoading = false;
         }else{
           this.$axios.get('/api/cityList')
            .then(res=>{
              if(res.data.status ===0 && res.data.data){
                var cities = res.data.data.cities;
                this.$nextTick(()=>{
                    new BScroll(this.$refs.city_body,{
                      tap:true
                    })
                })
                this.isLoading = false;
              // 理想数据结构
              // [{index:'A',list:[{nm:'北京',id:'1',isHot:'1',py:'beijing'}]}]
                var {cityList,hotList} = this.formtCityList(cities);
                this.cityList = cityList;
                this.hotList = hotList;
                window.localStorage.setItem('cityList',JSON.stringify(cityList));
                window.localStorage.setItem('hotList',JSON.stringify(hotList));
              }
            })
            .catch(err=>{
              Toast({
                message: '网络连接错误'+err,
                position: 'middle',
                duration: 3000
              });
            })
         }
        
      },
      formtCityList(cities){
        var cityList = [];
        var hotList = [];
        // 热门城市
        for(var i=0;i<cities.length;i++){
          if(cities[i].isHot ===1){
            hotList.push(cities[i]);
          }
        }
        for(var i=0;i<cities.length;i++){
          var firstLetter = cities[i].py.substring(0,1).toUpperCase();
          if(toCom(firstLetter)){//如果不在cityList中，新添加index
              cityList.push({ index:firstLetter,list:[ { nm:cities[i].nm,id:cities[i].id } ] })
          }else{//如果存在index,那么久列加
              for(var j=0;j<cityList.length;j++){
                if(cityList[j].index === firstLetter){
                  cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
                }
              }
          }
        }
        cityList.sort((n1,n2)=>{
          if(n1.index<n2.index){
            return -1;
          }else if(n1.index>n2.index){
            return 1;
          }else{
            return 0;
          }
        })
        function toCom(firstLetter){
          for(var i=0;i<cityList.length;i++){
            if(cityList[i].index === firstLetter){
              return false;
            }
          }
          return true;
        }
        console.log(cityList)
        console.log(hotList)
        return {
          cityList,
          hotList
        }
        
      },
      handToCity(nm,id){
        this.$store.commit('City/CITY_INFO',{nm,id});
        this.$router.push('/home/hotplaying');
        window.localStorage.setItem('Hotnm',nm);
        window.localStorage.setItem('Hotid',id);
      }

    },
    mounted() {
      this.getCityList();
      this.formtCityList()
    }
  }
</script>

<style lang="scss" scoped>
.city-list{
  .hot-city-box{
    margin-top:1.4rem;
    color: #2c3e50;
    h4{
      line-height: 2rem;
      background-color: #fafafa;
      padding:0 .5rem;
      font-size: .8rem;
      font-weight: 600;
    }
    .hot-citys{
      padding:0 .5rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        width:5rem;
        padding:.3rem 0;
        background-color: #fff;
        margin:.4rem;
        font-size: .8rem;
        border-radius: .2rem;
        text-align: center;
      }
    }
  }
  .mint-indexlist-content{
    height: auto;
  }
}
.mint-indexlist-content {
    margin: 0;
    padding: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
     overflow-scrolling: touch;
}
</style>