<template>
  <div>
    <User>
      <template v-slot:user="{ user }">
        <div v-if="user">
          <v-navigation-drawer fixed app v-model="drawer">
            <template v-slot:prepend>
              <v-list-item two-line>
                <v-list-item-avatar>
                  <v-img :src="user.photoURL" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ user.displayName }}</v-list-item-title>
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
                  <v-list-item-title>
                    <router-link :to="{ name: 'chat' }" :key="$route.fullPath">
                      Chats
                    </router-link></v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title
                    ><router-link
                      :to="{ name: 'profile', params: { id: user.uid } }"
                    >
                      Profile
                    </router-link>
                  </v-list-item-title>
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
          <v-toolbar color="primary" dark fixed app>
            <v-btn  @click.stop="drawer = !drawer">
            </v-btn>
            <v-toolbar-title>Vue Chat</v-toolbar-title>
          </v-toolbar>
          <v-container>
            <router-view></router-view>
          </v-container>
        </div>
        <Login v-else />
      </template>
    </User>
  </div>
</template>

<script>
import Login from "./Login.vue";
import User from "./User.vue";

import { auth } from "../firebase";
export default {
  components: { Login, User },
  data() {
    return {
      auth,
      drawer: false,
    };
  },
};
</script>

<style></style>
