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
                      <v-col cols="12" sm="6" md="4">
                        <v-img :src="{ photoURL }" />
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
              :src="photoURL"
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
      imageURL: null,
      teste: null,
    };
  },
  created() {
   this.photoURL = this.donwloadProfilePhoto();
  },
  methods: {
    async updateUserData() {
      storage
        .ref(`users/${auth.currentUser.uid}/profile.jpg`)
        .put(this.photoURL)
        .then((res) => {
          auth.currentUser
            .updateProfile({
              displayName: this.displayName,
              photoURL: res.fullpath,
            })
            .then((res) => {
              console.log(res);
              this.dialog = false;
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    },
    handleFileUpload(event) {
      const files = event.target.files;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.photoURL = files[0];
      console.log(this.photoURL);
    },

    async submitFile() {
      this.$refs.file.click();
    },
    async donwloadProfilePhoto() {
      if (auth.currentUser) {
        storage
          .ref(`users/${auth.currentUser.uid}/profile.jpg`)
          .getDownloadURL()
          .then((imgUrl) => {
            this.photoURL = imgUrl;
            console.log(imgUrl);
          });
      }
    },
  },
  props: ["user"],
};
</script>

<style></style>
