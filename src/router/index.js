import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  'linkActiveClass': 'active',
  routes: [{
      path: '/',
      name: 'index'
    },
    {
      path: '/goods',
      name: 'goods',
      component: require('@/components/goods/goods.vue')
    }, {
      path: '/ratings',
      name: 'ratings',
      component: require('@/components/ratings/ratings.vue')
    }, {
      path: '/seller',
      name: 'seller',
      component: require('@/components/seller/seller.vue')
    }
  ]
});
