<template>
  <div>
    Username: {{ user.uid }}
    <button @click="auth.signOut()">Sign Out</button>
  </div>
</template>

<script>
import { auth } from "../firebase";
export default {
    data(){
        return{
            auth
        }
    },
    props:['user']
};
</script>

<style></style>
