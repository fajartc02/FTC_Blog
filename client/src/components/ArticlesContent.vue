<template>
    <v-layout>
      <v-flex xs12 sm6>
        <div v-for="(article, index) in articles" :key="index">
          <v-card style="width: 900px;">
            <v-card-media v-if="article.img"
              :src="article.img"
              height="200px"
            ></v-card-media>
            <v-card-media v-else
              src="https://via.placeholder.com/350x150"
              height="200px"
            ></v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline" style="text-align: left">{{ article.title }}</h3>
                <hr>
                <p>Posted By: {{ article.UserId.username }} On {{article.createdAt.slice(0, 10)}}</p>
              </div>
            </v-card-title>
            <v-card-actions>
              <router-link class="nav-item font-style color" style="color: blue" :to="`/detail/${article._id}`">Show More</router-link>
            </v-card-actions>
          </v-card>
          <br>
        </div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      card_text: "",
      articles: '',
      toggleComent: false
    };
  },
  methods: {
    comment() {
      if(this.toggleComent === false) {
        this.toggleComent = true
      } else {
        this.toggleComent = false
      }
    },
    getArticles() {
      axios
      .get("http://localhost:3000/articles/getAll")
      .then(articles => {
        this.articles = articles.data.data
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  mounted() {
    if(localStorage.getItem('token')) {
      this.getArticles()
    }
  }
};
</script>

<style>
</style>
