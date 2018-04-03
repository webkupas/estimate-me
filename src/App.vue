<template>
  <v-app>
    <app-main-nav :drawer="drawer" :showDrawer="showDrawer" @drawerChanged="drawer = !drawer"></app-main-nav>    
    <app-drawer v-if="showDrawer" :drawer="drawer" ></app-drawer>
    <v-content>
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>      
    </v-content>
    <app-footer></app-footer>
    <div class="preloader">
      <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
    </div>
  </v-app>
</template>

<script>
import MainNav from './components/MainNav'
import Drawer from './components/Drawer'
import Footer from './components/Footer'

export default {
  data () {
    return {
      // eslint-disable-next-line
      drawer: true,
      showDrawer: this.$store.getters.user.id ? 1 : 0
    }
  },
  components: {
    'app-main-nav': MainNav,
    'app-drawer': Drawer,
    'app-footer': Footer
  },
  created () {
  }
}
</script>


<style>
  .preloader{
    background: rgba(255, 255, 255, .7);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 1s;
  }
  .preloader.is-active{
    opacity: 1;
    visibility: visible;
    z-index: 9999;
  }
  .slide-fade-enter,
  .slide-fade-leave-active{
    transform: translateY(20px);
    opacity: 0;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active{
    transition: all .5s ease-out;
  }

  .slide-fade-enter-active-to{
    opacity: 1;
    transform: translateY(0);
  }
</style>
