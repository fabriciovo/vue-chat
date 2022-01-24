<template>
  <div>
    <User>
      <template #user="{ user }">
        <div v-if="user">
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">User Profile</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Username"
                          hint="Display Name"
                          v-model="displayName"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="updateUserData(user)"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-card class="mx-auto" max-width="344">
            <v-img
              class="avatar"
              src="https://www.w3schools.com/howto/img_avatar.png"
              height="200px"
              alt="Avatar"
            ></v-img>
            <v-card-title> {{ user.displayName }} </v-card-title>

            <v-card-subtitle> {{ user.email }} </v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="orange lighten-2" text @click="dialog = true">
                Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </template>
    </User>
  </div>
</template>

<script>
import { auth } from "../firebase";
import User from "./User.vue";

export default {
  components: { User },
  data() {
    return {
      displayName: "",
      dialog: false,
    };
  },

  computed: {
    userId() {
      return this.$route.params.id;
    },
  },

  methods: {
    async updateUserData() {
      auth.currentUser
        .updateProfile({
          displayName: this.displayName,
        })
        .then((res) => {
          console.log(res);
          this.dialog = false;
        })
        .catch((err) => console.error(err));
    },
  },
  props: ["user"],
};
</script>

<style></style>
