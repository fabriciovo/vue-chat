<template>
  <User>
    <template #user="{ user }">
      <v-row no-gutters>
        {{user}}
        <v-col md="3"><ChatList :uid="user.uid" /> </v-col>
        <v-col cols="12" sm="6" md="8"><ChatRoom :user="user" /> </v-col>
      </v-row>
    </template>
  </User>
</template>

<script>
import ChatList from "./ChatList.vue";
import ChatRoom from "./ChatRoom.vue";
import User from "./User.vue";
export default {
  components: { ChatList, ChatRoom, User },
  props: ["user"],
};
</script>

<style></style>
