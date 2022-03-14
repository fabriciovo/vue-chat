<template>
  <v-app
    id="inspire"
    v-bind:style="{
      backgroundImage: 'url(./login-background.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }"
  >
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark>
                <v-toolbar-title
                  >Vue Chat -
                  {{ newUser ? "Sign Up" : "Login" }}</v-toolbar-title
                >
              </v-toolbar>
              <div v-if="!newUser">
                <v-card-text>
                  <v-form>
                    <v-text-field
                      name="email"
                      label="Email"
                      type="text"
                      v-model="email"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      v-model="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn to="/" color="grey" plain @click="newUser = true"
                    >Sign Up</v-btn
                  >
                  <v-btn dark to="/" @click="signInOrCreateUser()">Login</v-btn>
                </v-card-actions>
              </div>
              <div v-else>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      name="username"
                      label="Username"
                      type="text"
                      v-model="username"
                    ></v-text-field>
                    <v-text-field
                      name="email"
                      label="Email"
                      type="text"
                      v-model="email"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      v-model="password"
                    ></v-text-field>
                    <v-text-field
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      v-model="confirmPassword"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn to="/" color="grey" plain @click="newUser = false"
                    >Back</v-btn
                  >
                  <v-btn dark to="/" @click="signInOrCreateUser()">Create Account</v-btn>
                </v-card-actions>
              </div>
              <p class="has-text-danger" v-if="errorMessage">
                {{ errorMessage }}
              </p>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { auth } from "../firebase";
export default {
  data() {
    return {
      newUser: false,
      email: "",
      password: "",
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    async signInOrCreateUser() {
      this.loading = true;
      this.errorMessage = "";
      if (this.newUser) {
        auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            auth.currentUser
              .updateProfile({
                displayName: "Username",
                photoURL: "https://www.w3schools.com/howto/img_avatar.png",
              })
              .catch((error) => console.error(error));
          });
      } else {
        auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {})
          .catch((err) => console.error(err));
        console.log("user");
      }

      this.loading = false;
    },
  },
};
</script>
