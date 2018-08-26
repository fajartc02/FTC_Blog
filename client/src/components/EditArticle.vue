<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <h1>Edit Article</h1>
        <h3>BuLOG Brainstorming</h3>
    <v-text-field
      v-model="title"
      :rules="titleRules"
      label="Title"
      required
    ></v-text-field>
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
      @click="updateArticle"
    >
      Edit
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
        (v && v.length <= 10000) || "description must be less than 10000 characters"
    ],
    checkbox: false
  }),
  methods: {
    getOneArticle(id) {
      axios
        .get(`http://localhost:3000/articles/get/${id}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(article => {
          let title = article.data.data.title
          let description = article.data.data.description
          this.title = title
          this.description = description
        })
        .catch(err => {
          swal('Sorry You cannot have auth')
        });
    },
    updateArticle() {
      // console.log('masuk')
      let id = this.$route.params.id;
      let updatedArticle = {
        title: this.title,
        description: this.description
      }
      axios.put(`http://localhost:3000/articles/edit/${id}`, updatedArticle, {
        headers: {token: localStorage.getItem('token')}
      })
      .then(article => {
        swal('Success To update', 'success')
        this.$router.push('/article')
      })
      .catch(err => {
        swal('please fill form', 'info')
      })
    },
    clear() {
      this.$refs.form.reset();
    }
  },
  created() {
    let id = this.$route.params.id;
    this.getOneArticle(id);
  }
};
</script>

<style>
</style>
