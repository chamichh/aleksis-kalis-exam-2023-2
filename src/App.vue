<template>
    <div>
      <!-- HEADER -->
      <Header v-if="loggedIn" />
      <!--  HEADER END  -->
  
      <!-- BODY -->
      <div id="section-body">
        <NavigationComponent v-if="loggedIn" />
        <router-view class="section-router"></router-view>
      </div>
      <!--  BODY END  -->
  
      <!-- PLAYER -->
      <div id="section-player" v-if="loggedIn">
        <AudioPlayer />
      </div>
      <!--  PLAYER END  -->
    </div>
  </template>

<script>
import { defineComponent } from 'vue';
import { useAuthStore } from './stores/auth.js';
import NavigationComponent from '@/components/NavigationComponent.vue';

export default defineComponent({
  components: {
    NavigationComponent,
  },
  computed: {
    loggedIn() {
      const store = useAuthStore();
      return store.authenticated;
    },
  },
});
</script>
