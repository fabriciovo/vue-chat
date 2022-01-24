<template>
  <User>
    <template #user="{ user }">
      <div v-if="user">
        <v-row no-gutters>
          <v-col md="3"><ChatList :uid="user.uid" /> </v-col>
          <v-col cols="12" sm="6" md="8"><ChatRoom :user="user" /> </v-col>
        </v-row>
      </div>
    </template>
  </User>
</template>

<script>
import ChatList from "./ChatList.vue";
import ChatRoom from "./ChatRoom.vue";
import User from "./User.vue";
export default {
  components: { ChatList, ChatRoom, User },
};
</script>

<style></style>
