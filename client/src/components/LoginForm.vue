<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <h1>Login</h1>
        <h3>BuLOG Brainstorming</h3>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
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
      @click="login"
    >
      Login
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
    <br>
    <p>Don't have an Account? <router-link class="nav-item font-style color" style="color:blue;" to="/register" >Signup</router-link></p>
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
    checkbox: false
  }),

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios
          .post("http://localhost:3000/signin", {
            email: this.email,
            password: this.password
          })
          .then(result => {
            if(result) {
              swal("Success to login", "", "success")
              this.$router.push("/")
              localStorage.setItem("token", result.data.token)
            }
          })
          .catch(err => {
            swal("Username or password wrong", "", "error")
          })
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
}
</script>

<style>
</style>
