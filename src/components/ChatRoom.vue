<template>
  <div v-if="chatId">
    {{ chatId }}

    Open this link in another browser window to chat
    <code>https://your-url.com/#/chats/{{ chatId }}</code>

    <main class="section">
      <User>
        <template #user="{ user }">
          <div v-if="user">
            <v-card class="overflow-y-auto chat">
              <ul>
                <li v-for="message of messages" :key="message.id">
                  <ChatMessage
                    :message="message"
                    :owner="user.uid === message.sender"
                    :user="user"
                  />
                </li>
              </ul>
            </v-card>
            <hr />
            <audio v-if="newAudio" :src="newAudioURL" controls></audio>

            <input v-model="newMessageText" class="input" />

            <button
              :disabled="(!newMessageText && !newAudio) || loading"
              class="button is-success"
              type="text"
              @click="addMessage(user)"
            >
              Send
            </button>
            <button v-if="!recorder" @click="record()" class="button is-info">
              Record Voice
            </button>
            <button v-else @click="stop()" class="button is-danger">
              Stop
            </button>
          </div>
          <Login v-else />
        </template>
      </User>
    </main>
  </div>
</template>

<script>
import User from "./User.vue";
import ChatMessage from "./ChatMessage.vue";
import Login from "./Login.vue";
import { db, storage } from "../firebase";

export default {
  components: {
    User,
    Login,
    ChatMessage,
  },
  data() {
    return {
      newMessageText: "",
      loading: false,
      messages: [],
      newAudio: null,
      recorder: null,
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
    messagesCollection() {
      return db.doc(`chats/${this.chatId}`).collection("messages");
    },
    newAudioURL() {
      return URL.createObjectURL(this.newAudio);
    },
  },
  firestore() {
    return {
      messages: this.messagesCollection.orderBy("createdAt").limitToLast(10),
    };
  },
  methods: {
    async addMessage(user) {
      this.loading = true;

      let audioURL = null;

      const { id: messageId } = this.messagesCollection.doc();

      if (this.newAudio) {
        const storageRef = storage
          .ref("chats")
          .child(this.chatId)
          .child(`${messageId}.wav`);

        await storageRef.put(this.newAudio);

        audioURL = await storageRef.getDownloadURL();
      }

      await this.messagesCollection.doc(messageId).set({
        text: this.newMessageText,
        sender: user.uid,
        senderName: user.displayName,
        createdAt: Date.now(),
        audioURL,
      });

      this.loading = false;
      this.newMessageText = "";
      this.newAudio = null;
    },
    async record() {
      this.newAudio = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const options = { mimeType: "audio/webm" };
      const recordedChunks = [];
      this.recorder = new MediaRecorder(stream, options);

      this.recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      });

      this.recorder.addEventListener("stop", () => {
        this.newAudio = new Blob(recordedChunks);
      });

      this.recorder.start();
    },
    async stop() {
      this.recorder.stop();
      this.recorder = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  background: #efefef;
  padding: 10px;
  border-radius: 0;
}

li {
  display: flex;
}

.chat {
  height: 400px;
  max-height: 400px;
}
</style>
