<template>
    <div class="home">
    <v-container grid-list-md flex>
      <div class="nav">
        <h1 style="background-color= red">BuLOG Brainstorming</h1>
      </div>
        <v-layout row wrap>
            <v-flex xs3 column>
                <SideBar class="style-fixed"/>
            </v-flex>
            <v-layout xs9 column class="contentArticle">
                <v-btn color="dark" @click="toggleNewArticle">Create New Article</v-btn>
                <ArticleTable :newArticle="idArticle" />
                <AddArticle @article-added="checkData" v-if="createFormVisibility"/>
                <router-view></router-view>
            </v-layout>
        </v-layout>
    </v-container>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import ArticleTable from "@/components/ArticleTable.vue";
import AddArticle from "@/components/AddArticle.vue";
import EditArticle from "@/components/EditArticle.vue";

export default {
  data: function() {
    return {
      idArticle: "",
      createFormVisibility: false,
      editFormVisibility: false
    };
  },
  methods: {
    toggleNewArticle: function() {
      if (this.createFormVisibility == true) {
        this.createFormVisibility = false;
      } else {
        this.createFormVisibility = true;
      }
    },
    toggleEditArticle: function() {
      if (this.editFormVisibility == true) {
        this.editFormVisibility = false;
      } else {
        this.editFormVisibility = true;
      }
    },
    checkData(idArticle) {
      // console.log(idArticle)
      this.idArticle = idArticle;
    },
    checkAuth() {
      let token = localStorage.getItem('token')
      if(!token) {
        this.$router.push('/login')
      }
    }
  },
  components: {
    SideBar,
    ArticleTable,
    AddArticle,
    EditArticle
  },
  created() {
    this.checkAuth()
  }

};
</script>

<style>
</style>
