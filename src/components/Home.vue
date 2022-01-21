<template>
  <div>
    <User v-slot:user="{ user }">
      <div v-if="user">
        <div class="section">
          <h2 style="margin-left: 13%">Chats</h2>
          <v-navigation-drawer absolute permanent>
            <template v-slot:prepend>
              <v-list-item two-line>
                <v-list-item-avatar>
                  <img src="https://randomuser.me/api/portraits/women/81.jpg" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Jane Smith</v-list-item-title>
                  <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                  <v-list-item-subtitle></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Chats</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Profile</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title
                    ><button @click="auth.signOut()">
                      Sign Out
                    </button></v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
          <v-container style="margin-left: 13%">
            <v-row no-gutters>
              <v-col md="3"><ChatList :uid="user.uid" /> </v-col>
              <v-col cols="12" sm="6" md="8"><ChatRoom :user="user" /> </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
      <Login v-else />
    </User>
  </div>
</template>

<script>
import Login from "./Login.vue";
import User from "./User.vue";
import ChatList from "./ChatList.vue";
import ChatRoom from "./ChatRoom.vue";
import { auth } from "../firebase";
export default {
  components: { Login, User, ChatList, ChatRoom },
  data() {
    return {
      auth,
    };
  },
};
</script>

<style>
.container {
  margin-left: 13%;
}
</style>
