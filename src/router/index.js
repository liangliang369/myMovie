import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home/Home'
import detail from '@/components/pages/Home/detail'
import CityList from '@/components/component/CityList/CityList'
import HotPlaying from '@/components/component/HotPlaying/HotPlaying'
import ComingSoon from '@/components/component/ComingSoon/ComingSoon'
import Search from '@/components/component/Search/Search'

import Cinema from '@/components/pages/Cinema/Cinema'
import Profile from '@/components/pages/Profile/Profile'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
          path:'citylist',
          name:'CityList',
          component:CityList
        },
        {
          path:'hotplaying',
          name:'HotPlaying',
          component:HotPlaying
        },
        {
          path:'comingsoon',
          name:'ComingSoon',
          component:ComingSoon
        },
        {
          path:'search',
          name:'Search',
          component:Search
        },
        {
          path:'detail/:id',
          name:'Detail',
          components:{
            detail
          },
          props:{
            detail:true
          }
        },
        {
          path:'/home',
          redirect:'/home/hotplaying'
        }
      ]
    },
    {
      path: '/',
      redirect:'/home'
    },
    {
      path:'/cinema',
      name:'Cinema',
      component:Cinema
    },
    {
      path:'/profile',
      name:'Profile',
      component:Profile
    },
  ]
})
