<template>
    <nav id="nav-main" class="wrapper-navigation">
      <ol>
        <li v-for="(link, index) in routes" :key="index">
          <router-link :to="link.path">{{ link.name }}</router-link>
        </li>
      </ol>
    </nav>
  </template>
  
<script>
import { useAuthStore } from '../stores/auth.js'
export default {
    data() {
        return {
            routes: [
                {
                    name: 'SONGS',
                    path: '/'
                },
                {
                    name: 'ALBUMS',
                    path: '/albums'
                },
                {
                    name: 'ABOUT ME',
                    path: '/about'
                }
            ],
            useAuthStore
        }
    },
}
</script>