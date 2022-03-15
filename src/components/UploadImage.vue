<template>
  <v-main>
    <picture-input
      ref="pictureInput"
      @change="onChanged"
      @remove="onRemoved"
      :width="200"
      :removable="true"
      removeButtonClass="ui red button"
      :height="200"
      accept="image/jpeg, image/png, image/gif"
      buttonClass="ui button primary"
      :customStrings="{
        upload: '<h1>Upload it!</h1>',
        drag: 'Drag and drop your image here',
      }"
    >
    </picture-input>
  </v-main>
</template>

<script>
import PictureInput from "vue-picture-input";

export default {
  data() {
    return {
      imageURL: "",
    };
  },
  components: {
    PictureInput,
  },
  methods: {
    onChanged() {
      console.log("New picture loaded");
      if (this.$refs.pictureInput.file) {
        this.imageURL = this.$refs.pictureInput.file;
      } else {
        console.log("Old browser. No support for Filereader API");
      }
    },
    onRemoved() {
      this.imageURL = "";
    },
  },
};
</script>

<style></style>
