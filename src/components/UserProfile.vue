<template>
  <div>
    <v-card class="mx-auto" max-width="344">
      <v-img
        class="avatar"
        src="https://www.w3schools.com/howto/img_avatar.png"
        height="200px"
        alt="Avatar"
      ></v-img>

      <v-card-title> Username </v-card-title>

      <v-card-subtitle> Description </v-card-subtitle>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="orange lighten-2" text> Edit </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { auth } from "../firebase";

export default {
  data() {
    return {
      auth,
    };
  },
  props: ["user"],
};
</script>

<style></style>
