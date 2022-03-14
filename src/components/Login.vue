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
    <v-main>
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
                  <v-btn dark to="/" @click="singIn()">Login</v-btn>
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
                  <v-btn dark to="/" @click="singUp()">Create Account</v-btn>
                </v-card-actions>
              </div>
            </v-card>
            <v-snackbar
              v-model="showErrorMessage"
              :timeout="timeoutErrorMessage"
            >
              <p class="has-text-danger">{{ errorMessage }}</p>
            </v-snackbar>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { auth } from "../firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      errorMessage: "",
      newUser: false,
      loading: false,
      showErrorMessage: false,
      timeoutErrorMessage: 2000,
    };
  },
  methods: {
    async singUp() {
      this.loading = true;
      // eslint-disable-next-line no-debugger
      debugger;
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          auth.currentUser
            .updateProfile({
              displayName: this.username,
              photoURL: "https://www.w3schools.com/howto/img_avatar.png",
            })
            .catch((error) => {
              this.showErrorMessage = true;
              this.errorMessage = error.message;
            });
          console.log(this.username);
        })
        .catch((error) => {
          this.showErrorMessage = true;
          this.errorMessage = error.message;
        })
        .finally(() => (this.loading = false));
    },

    async singIn() {
      this.loading = true;
      // eslint-disable-next-line no-debugger
      debugger;

      if (
        this.email === "" ||
        this.password === "" ||
        this.confirmPassword === "" ||
        this.username === ""
      ) {
        this.errorMessage = "All fields must be filled";
        this.loading = false;
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "password not matched";
        this.loading = false;
        return;
      }
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .catch((error) => {
          this.showErrorMessage = true;
          this.errorMessage = error.message;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
