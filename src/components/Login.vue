<template>
  <aside class="section">
    <h3>Sign in Anonymously</h3>
    <button class="button" @click="auth.signInAnonymously()">Sign In</button>

    <div v-if="newUser">
      <h3>Sign Up for a New Account</h3>
      <a href="#" @click="newUser = false">Already Have an Account</a>
    </div>

    <div v-else>
      <h3>Sign In with Email</h3>
      <a href="#" @click="newUser = true"> Create Account</a>
    </div>

    <label for="email">Email</label><br />
    <input v-model="email" placeholder="email" type="email" class="input" />
    <label for="password">Password</label><br />
    <input v-model="password" type="password" class="input" />
    <br />

    <button
      class="button is-info"
      :class="{ 'is-loading': loading }"
      @click="signInOrCreateUser()"
    >
      {{ newUser ? "Sign Up" : "Login" }}
    </button>

    <p class="has-text-danger" v-if="errorMessage">{{ errorMessage }}</p>
  </aside>
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
          .then((data) => {
            data.user
              .updateProfile({
                displayName: "Username",
                email: this.email,
              })
              .then(() => {});
          })
          .catch((err) => {
            console.error(err);
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
