<template>
    <div>
      <v-layout>
          <v-flex xs12 sm6>
            <v-card style="width: 900px;">
              <v-card-media
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                height="200px"
              ></v-card-media>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline" style="text-align: left">{{ article.title }}</h3>
                  <hr>
                  <p>Posted By: {{ user.name }} On {{article.date.slice(0, 10)}}</p>
                  <br>
                  <div style="text-align: left">
                    <h3>Description:</h3>
                    <p>{{article.description}}</p>
                  </div>
                </div>
              </v-card-title>
            </v-card>
            <br>
              <v-card style="width: 900px;">
                <v-card-title primary-title>
                  <v-text-field
                    v-model="article.comment"
                    label="Comment"
                    id="comment"
                  ></v-text-field>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat color="teal" @click="addComment">Comment</v-btn> <v-btn flat color="teal">Cancle</v-btn>
                </v-card-actions>
              </v-card>
              <br>
              <div v-if="article.comments.length !== 0">
                <h1 style="text-align: left">Comments</h1>
                <div v-for="(comment, index) in article.comments" :key="index">
                  <v-card style="width: 900px;">
                    <v-card-title primary-title>
                      <div style="text-align: left">
                        <h2>{{comment.name}}</h2>
                        <hr>
                        <p>Post on {{comment.date.slice(0, 10)}}</p>
                        {{ comment.comment }}
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn v-if="nameUser === comment.name || nameUser === user.name" flat color="teal" @click="deleteComment(comment.name, comment._id)">Delete</v-btn>
                    </v-card-actions>
                  </v-card>
                </div>
              </div>
          </v-flex>
      </v-layout>
    </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  data() {
    return {
      article: {
        title: "",
        description: "",
        comments: '',
        date: ''
      },
      user: {
        name: '',
        otherName: ''
      }
    };
  },
  methods: {
    getArticles(id) {
      axios
        .get(`http://localhost:3000/articles/get/${id}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(article => {
          let description = article.data.data.description;
          let title = article.data.data.title;
          this.article.description = description;
          this.article.title = title;
          this.article.comments = article.data.data.comments
          this.article.date = article.data.data.createdAt
          this.user.name = article.data.data.UserId.username
        })
        .catch(err => {
          swal("Sorry You cannot have auth");
        });
    },
    addComment() {
      let id = this.$route.params.id
      let commentData = {
        comment: this.article.comment
      }
      axios.put(`http://localhost:3000/articles/comment/${id}`, commentData, {
        headers: { token: localStorage.getItem("token") }
      })
      .then(response => {
        swal('Success to comment', 'success')
        this.$router.go()
      })
      .catch(err => {
        console.log(err);
      })
    },
    deleteComment(commentName, idComment) {
      if(this.nameUser === commentName || this.nameUser === this.user.name) {
        let data = {
          commentName: commentName,
          idComment: idComment
        }
        let id = this.$route.params.id
        axios.put(`http://localhost:3000/articles/comment/delete/${id}`, data, {
          headers: {token: localStorage.getItem('token')}
        })
        .then(() => {
          swal('Success to delete comment', 'success')
          this.$router.go()
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
  },
  created() {
    let id = this.$route.params.id;
    this.getArticles(id)
    console.log(this.nameUser); // ini props data dari parent yang dikirim dari children yg lain
  },
  props: ['nameUser']
};
</script>

<style>
</style>
