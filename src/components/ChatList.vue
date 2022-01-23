<template>
  <v-card  v-scroll.self="onScroll" class="overflow-y-auto chat-list">
    <v-card-title> Chat List </v-card-title>
    <v-card-subtitle>
      <button @click="createChatRoom()" class="button">
        Create new Chat
      </button></v-card-subtitle
    >
    <v-card-actions>
      <ul>
        <li v-for="chat of chats" :key="chat.id">
          <router-link :to="{ name: 'chatId', params: { id: chat.id } }" :key="$route.fullPath">
            {{ chat.id }}
          </router-link>
        </li>
      </ul>
    </v-card-actions>
  </v-card>
</template>

<script>
import { db } from "../firebase";
export default {
  data() {
    return {
      chats: [],
    };
  },
  firestore() {
    return {
      chats: db.collection("chats").where("owner", "==", this.uid),
    };
  },
  methods: {
    async createChatRoom() {
      const newChat = await db.collection("chats").add({
        createdAt: Date.now(),
        owner: this.uid,
        members: [this.uid],
      });
      console.log(newChat);
    },
  },
  props: ["uid"],
};
</script>

<style>
.chat-list {
  height: 600px;
  max-height: 600px;
  margin-right: 10px ;
}

</style>
