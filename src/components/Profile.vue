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
                      <v-col>
                        <v-img v-bind:src="imageURL" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <input
                          type="file"
                          style="display: none"
                          accept="image/png, image/jpeg"
                          id="photoURL"
                          ref="file"
                          @change="handleFileUpload($event)"
                        />
                        <button @click="submitFile()">open file dialog</button>
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
              :src="user.photoURL"
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
import { auth, storage } from "../firebase";
import User from "./User.vue";

export default {
  components: { User },
  data() {
    return {
      displayName: "",
      dialog: false,
      photoURL: "",
      imageURL: "",
      imageToSave: "",
    };
  },
  methods: {
    async updateUserData() {
      storage
        .ref(`users/${auth.currentUser.uid}/profile.jpg`)
        .put(this.photoURL)
        .then(() => {
          storage
            .ref(`users/${auth.currentUser.uid}/profile.jpg`)
            .getDownloadURL()
            .then((imgUrl) => {
              auth.currentUser
                .updateProfile({
                  displayName: this.displayName,
                  photoURL: imgUrl,
                })
                .then(() => {
                  this.dialog = false;
                });
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    },
    handleFileUpload(event) {
      this.photoURL = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.imageURL = reader.result;
      });
      reader.readAsDataURL(event.target.files[0]);
    },

    async submitFile() {
      this.$refs.file.click();
    },
    async donwloadProfilePhoto() {},
  },
  props: ["user"],
};
</script>

<style></style>
