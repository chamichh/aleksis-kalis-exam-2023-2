import { defineStore } from 'pinia';
import router from '../router';

export const useAuthStore = defineStore('authentication', {
  state: () => ({
    user: {
      name: 'NAME',
      surname: 'SURNAME',
      code: 'IT1234',
      favorite_songs: localStorage.favorite_songs ? localStorage.favorite_songs.split(',') : [],
    },
    authenticated: false,
  }),
  getters: {
    is_authenticated() {
      return localStorage.authenticate !== null ? localStorage.authenticated : this.authenticated;
    },
    getFavoriteSongs() {
      return this.user.favorite_songs;
    },
  },
  actions: {
    setUserData(name, surname, code) {
      Object.assign(this.user, { name, surname, code });
    },
    authenticate(email, password) {
      const isCredentialsValid = email === 'aleksis.kalis@va.lv' && password === '123456';

      if (isCredentialsValid) {
        this.setAuthenticationStatus(true);
        router.push('/');
      }
    },
    logout() {
      localStorage.clear();
      this.setAuthenticationStatus(false);
      router.push('/login');
    },
    toggleFavorite(songID) {
      const index = this.user.favorite_songs.indexOf(songID);

      if (index !== -1) {
        this.user.favorite_songs.splice(index, 1);
      } else {
        this.user.favorite_songs.push(songID);
      }
    },
    setAuthenticationStatus(status) {
      this.authenticated = status;
      localStorage.authenticated = status;
    },
  },
});
