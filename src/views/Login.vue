<template>
  <div id="login-view">
    <form class="login-form">
      <div class="wrapper-logo">
        <img src="@/assets/logo.svg" />
        <div>KRAKEN.FM</div>
      </div>
      <input id="input-email" placeholder="E-mail" v-model="user_form.Email" />
      <input id="input-password" placeholder="Password" type="password" v-model="user_form.Password" />
      <button id="btn-submit" @click="submitForm" :disabled="isDisabled">LOGIN</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
export default {
  data() {
    return {
      user_form: {
          Email: '',
          Password: ''
      },
      useAuthStore,
    };
  },
  computed: {
    isDisabled() {
      return this.user_form.Email.trim().length == 0 || this.user_form.Password.trim().length < 6;
    },
    submitForm(){
      const store = useAuthStore();
      return store.authenticate(this.user_form.Email, this.user_form.Password);
    },
  },
};
</script>
