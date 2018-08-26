<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <h1>Register</h1>
        <h3>BuLOG Brainstorming</h3>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="50"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <form id="inputFile">
      <label>Photo Pofile: </label><br><br>
      <input type="file" placeholder="Choose File" v-on:change="getImage($event)">
    </form>
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      type="password"
      label="Password"
      required
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      @click="Register"
    >
      Register
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
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 50) || "Name must be less than 50 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length <= 10) || "Password must be less than 10 characters"
    ],
    image: '',
    checkbox: false
  }),

  methods: {
    Register() {
      let formData = new FormData();
      formData.append("image", this.image);
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios
          .post("http://localhost:3000/articles/upload", formData)
          .then(response => {
            axios
              .post("http://localhost:3000/signup", {
                username: this.name,
                email: this.email,
                password: this.password,
                img: response.data.link
              })
              .then(result => {
                // console.log(result);
                swal("Success to register", "", "success");
                this.$router.push("/login");
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {});
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
</style>
