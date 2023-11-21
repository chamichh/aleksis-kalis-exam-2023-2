<template>
    <div id="about-view">
      <div class="wrapper-header">
        <h1>ABOUT ME</h1>
        <div class="settings">
          <button id="btn-edit" @click="toggleEditMode" :class="{ active: editMode }">{{ editMode ? 'cancel' : 'Edit Form' }}</button>
          <button id="btn-save" v-if="editMode" @click="saveInfo">Save Form</button>
        </div>
      </div>
      <form>
        <div v-for="field in formFields" :key="field.id" class="wrapper-input">
          <label>{{ field.label }}</label>
          <input v-if="editMode" :id="field.inputId" v-model="field.value" />
          <p v-if="!editMode" :id="field.textId">{{ field.value }}</p>
        </div>
        <div class="wrapper-songs">
          <label>FAVORITE SONGS</label>
          <ul v-if="!noFavoriteSongs">
            <li v-for="song in sortFavorites" :key="song.id">
              <img id="img-album" :src="song.album.images[1].url" />
              <div class="song-info">
                <p id="txt-song" class="song-name">{{ song.name }}</p>
                <p id="txt-artist" class="song-artists">{{ getArtists(song.artists) }}</p>
              </div>
            </li>
          </ul>
          <div id="txt-empty" class="empty" v-if="favoriteListFiltered.length === 0">NO SONGS FOUND</div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../stores/auth.js';
  import songsData from '../data/songs.js';
  
  export default {
    data() {
      const state = useAuthStore();
      return {
        editMode: false,
        formFields: [
          { id: 1, label: 'NAME', inputId: 'input-name', textId: 'txt-name', value: state.user.name },
          { id: 2, label: 'SURNAME', inputId: 'input-surname', textId: 'txt-surname', value: state.user.surname },
          { id: 3, label: 'STUDENT CODE', inputId: 'input-code', textId: 'txt-code', value: state.user.code },
        ],
        songsData: songsData,
        favoriteList: state.getFavoriteSongs,
      };
    },
    computed: {
      noFavoriteSongs() {
        return this.favoriteList.length === 0;
      },
      favoriteListFiltered() {
        const favoriteIds = this.favoriteList.map((song) => song.id);
        return this.songsData.filter((song) => favoriteIds.includes(song.id));
      },
      sortFavorites() {
        return this.songsData.filter((song) => this.favoriteList.includes(String(song.id)));
      },
    },
    methods: {
      toggleEditMode() {
        this.editMode = !this.editMode;
      },
      saveInfo() {
        this.editMode = false;
        const updated = useAuthStore();
        this.formFields.forEach((field) => {
          updated.user[field.label.toLowerCase()] = field.value;
        });
      },
      getArtists(artists) {
        return artists.map((artist) => artist.name).join(', ');
      },
    },
  };
  </script>
  