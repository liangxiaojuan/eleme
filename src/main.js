// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'common/stylus/index.styl';
import router from './router';
import App from './App';
import fastclick from 'fastclick';
fastclick.attach(document.body);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
