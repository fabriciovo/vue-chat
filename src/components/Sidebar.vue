<template>
  <v-app id="app">
    <template v-if="!$route.path.includes('login')">
      <v-navigation-drawer v-model="drawer" fixed app>
        <v-toolbar flat dark color="success">
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                Simply Clinical Software
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list dense>
          <v-list-tile @click="drawer = false" to="/login">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Login</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="drawer = false">
            <v-list-tile-action>
              <v-icon>contact_mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Contact</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="primary" dark fixed app>
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-toolbar>
    </template>
    <v-content>
      <keep-alive :include="['Login']">
        <router-view></router-view>
      </keep-alive>
    </v-content>
  </v-app>
</template>


<script>
export default {
  data: () => ({
    drawer: false,
  }),
  props: {
    source: String,
  },
};
</script>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
