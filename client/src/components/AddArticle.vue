<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <h1>Add Article</h1>
        <h3>BuLOG Brainstorming</h3>
    <v-text-field
      v-model="title"
      :rules="titleRules"
      label="Title"
      required
    ></v-text-field>
    <form id="inputFile">
      <label>Image</label><br><br>
      <input type="file" placeholder="Choose File" v-on:change="getImage($event)">
    </form>
    <v-textarea
      v-model="description"
      :rules="descriptionRules"
      type="textarea"
      label="description"
      required
    ></v-textarea>
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>
    <v-btn
      :disabled="!valid"
      @click="addNewArticle"
    >
      Add
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  data: () => ({
    valid: true,
    title: "",
    titleRules: [
      v => !!v || "title is required",
      v => (v && v.length <= 50) || "title must be less than 50 characters"
    ],
    description: "",
    descriptionRules: [
      v => !!v || "description is required",
      v =>
        (v && v.length <= 10000) ||
        "description must be less than 10000 characters"
    ],
    checkbox: false,
    image: ""
  }),
  methods: {
    addNewArticle() {
      let self = this;
      let token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("image", this.image);
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post("http://localhost:3000/articles/upload", formData, {
          headers: {token: token}
        })
        .then(response => {
          axios
          .post(
            `http://localhost:3000/articles`,
            {
              title: this.title,
              description: this.description,
              image: response.data.link
            },
            {
              headers: { token: localStorage.getItem("token") }
            }
          )
          .then(result => {
            swal("Success to add article", "", "success")
            this.$router.go()
            self.$emit("article-added", result.data.data._id);
          })
          .catch(err => {
            swal("Failed to add article", "", "error");
          });
        })
        .catch(err => {

        })
      }
    },
    getImage(url) {
      this.image = url.target.files[0]
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style>
#inputFile {
  text-align: left;
}
</style>
