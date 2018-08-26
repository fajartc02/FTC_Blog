<template>
     <v-navigation-drawer
    :mini-variant.sync="mini"
    v-model="drawer"
    hide-overlay
    stateless style="height: 800px"
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img v-if="user.token" :src="user.img" alt="user image">
            <img v-else src="https://png.icons8.com/ios/1600/user-male-circle-filled.png" alt="user image">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-if="user.token">{{ user.name }}</v-list-tile-title>
            <v-list-tile-title v-else>
              Please Login
            </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>
        <!-- ada @click -->
      <div v-if="!state">
        <v-list-tile
          v-for="item in items"
          :key="item.title"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title><router-link class="nav-item font-style color" style="color:black;height: 100px!important" :to="item.path">{{ item.title }}</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </div>
      <!-- localStorage.getItem('token') -->
      <div v-else>
        <v-list-tile
          v-for="item in itemsLogin"
          :key="item.title"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <div v-if="item.methode">
              <v-list-tile-title><router-link class="nav-item font-style color" style="color:black;" :to="item.path" ><v-btn block color="dark color" @click="logout()" dark>Logout</v-btn></router-link></v-list-tile-title>
            </div>
            <div v-else>
              <v-list-tile-title><router-link class="nav-item font-style color" style="color:black;" :to="item.path" >{{ item.title }}</router-link></v-list-tile-title>
            </div>
          </v-list-tile-content>
        </v-list-tile>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "home", path: "/" },
        // { title: "Profile", icon: "fas fa-user", path: "/profile" },
        { title: "My Article", icon: "fas fa-newspaper", path: "/" },
        { title: "Login", icon: "fas fa-sign-in-alt", path: "/login" },
        // { title: "Register", icon: "fas fa-registered", path: "/register"},
      ],
      itemsLogin: [
        { title: "Home", icon: "home", path: "/" },
        // { title: "Profile", icon: "fas fa-user", path: "/profile" },
        { title: "My Article", icon: "fas fa-newspaper", path: "/article" },
        { title: "Logout", icon: "fas fa-sign-out-alt", path: "/login", methode: 'logout()' }
      ],
      mini: true,
      right: null,
      user: {
        name: "",
        img: "",
        token: ""
      },
      state: ''
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  created() {
    let token = localStorage.getItem("token")
    if (token) {
      this.state = true
      axios
        .get(`http://localhost:3000/users`, {
          headers: { token:localStorage.getItem('token') }
        })
        .then(result => {
          this.user.img = result.data.data.img
          this.user.name = result.data.data.username
          this.user.token = token
          this.$emit('check-user', this.user.name)
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.state = false
    }
  }
};
</script>

<style>
.v-list__tile__title {
  height: 40px
}
</style>
