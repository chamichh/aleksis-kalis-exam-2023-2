<template>
    <div id="main-header" class="active">
        <div class="wrapper-logo">
            <img src="@/assets/logo.svg" alt="logo"/>
            <h2>KRAKEN.FM</h2>
        </div>
        <div class="wrapper-profile">
            <div class="section-user">
                <span class="avatar"></span>
                <h3 id="txt-full-name">{{ fullname }}</h3>
            </div>
            <button id="btn-logout" @click="logout">LOGOUT</button>
        </div>
    </div>
</template>
<script>
import { useAuthStore } from '../stores/auth';
export default{
    computed: {
        logout(){
            const store = useAuthStore();
            return store.logout();
        },
        fullname(){
            const state = useAuthStore();
            return state.user.name + " " + state.user.surname;
        }
    }
}
</script>
