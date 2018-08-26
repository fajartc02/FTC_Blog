<template>
  <div class="home">
    <div class="nav">
    <h1 style="background-color= red">BuLOG Brainstorming</h1>
    </div>
    <v-container grid-list-md flex>
        <v-layout row wrap>
            <v-flex xs3 column>
                <SideBar @check-user="getUser" class="style-fixed"/>
            </v-flex>
            <v-layout xs9 column class="contentArticle">
              <router-view :nameUser="finalUser"></router-view>
            </v-layout>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import SideBar from "@/components/SideBar.vue";
import ArticlesContent from "@/components/ArticlesContent.vue";
import axios from "axios"
import swal from "sweetalert2"

export default {
  name: "home",
  data() {
    return {
      waitDisplayArticles: false,
      user: '',
      finalUser: ''
    };
  },
  methods: {
    getUser(nameUser) {
      this.user = nameUser
      if(this.user) {
        this.finalUser = this.user
      }
    }
  },
  components: {
    HelloWorld,
    SideBar,
    ArticlesContent
  },
  created() {
    // console.log(this.$router.params);
    
    if (!localStorage.getItem("token")) {
      this.$router.push("/login");
      swal("You must be login", "", "info");
    } else {
      this.getUser()
    }
  }
};
</script>

<style scopedSlots>
.contentArticle {
  padding-top: 50px;
  min-height: 100px;
  min-width: 100px;
  margin-left: auto;
  margin-right: auto;
}
.container {
  padding: 0px;
  margin: 0px;
}
h1 {
  text-align: center
}
.nav {
  background-color: #42b983;
  position: fixed;
  width: 100%;
  z-index: 100;
  opacity: 0.8;
}
.style-fixed {
  position: fixed;
  padding-top: 50px;
  z-index: 101;
}
</style>
