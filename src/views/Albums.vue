<template>
    <div id="album-view">
      <div class="wrapper-header">
        <h1>ALBUMS</h1>
        <div class="settings">
          <button id="btn-grid" :class="{ active: isGrid }" @click="toggleGrid(true)">
            <IconGrid />
          </button>
          <button id="btn-list" :class="{ active: !isGrid }" @click="toggleGrid(false)">
            <IconList />
          </button>
        </div>
      </div>
      <ul id="list-albums" :class="{ grid: isGrid }">
        <li v-for="album in albums" :key="album.id" @click="handleAlbumClick(album)">
          <img :src="album.images[1].url" />
          <div class="album-info">
            <h4>{{ album.name }}</h4>
            <p>{{ getArtists(album.artists) }}</p>
            <div class="album-year">
              <p>{{ getYear(album.release_date) }}</p>
              <p>{{ getTrackCount(album.tracks.length) }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import IconGrid from '../components/icons/IconGrid.vue'
  import IconList from '../components/icons/IconList.vue'
  import { usePlayerStore } from '@/stores/player'
  import songsData from '../data/songs'
  
  export default {
    components: {
      IconGrid,
      IconList
    },
    data() {
      return {
        isGrid: true,
        clickCount: 0
      }
    },
    methods: {
      toggleGrid(value) {
        this.isGrid = value
      },
      handleAlbumClick(album) {
        const player = usePlayerStore()
        this.clickCount++
  
        let timer
  
        if (this.clickCount === 1) {
          timer = setTimeout(() => {
            this.clickCount = 0
          }, 500)
        } else {
          clearTimeout(timer)
          player.setPlaylist(album.tracks)
          player.setNowPlaying(album.tracks[0])
          this.clickCount = 0
        }
      },
      getArtists(artists) {
        return artists.map(artist => artist.name).join(', ')
      },
      getYear(release_date) {
        const year = new Date(release_date)
        return year.getFullYear()
      },
      getTrackCount(trackCount) {
        return trackCount > 1 ? `${trackCount} songs` : `${trackCount} song`
      }
    },
    computed: {
      albums() {
        return songsData.reduce((accumulator, currentSong) => {
          const albumId = currentSong.album.id
          accumulator[albumId] = accumulator[albumId] || {
            ...currentSong.album,
            tracks: []
          }
          accumulator[albumId].tracks.push(currentSong)
          return accumulator
        }, Object.create(null))
      },
      getCurrentAlbumId() {
        const album = usePlayerStore()
        return album.getNowPlayingAlbumID
      }
    }
  }
  </script>
  