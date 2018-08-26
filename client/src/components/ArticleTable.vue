<template>
    <v-card>
        <v-card-title>
        <!-- <v-btn color="dark" @click.prevent="createNewArticle">Create New Article</v-btn> -->
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="articles"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.title }}</td>
                <td class="text-xs-center">{{ props.item.createdAt.slice(0, 10) }}</td>
                <td class="text-xs-center"><router-link class="styleLink" color="dark" :to="`/article/edit/${props.item._id}`"><v-btn color="dark">Edit</v-btn></router-link> | <router-link class="styleLink" to=""><v-btn color="dark" @click="deleteArticle(props.item._id)">Delete</v-btn></router-link></td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
        <v-container grid-list-xs>
            
        </v-container>
  </v-card>

</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import AddArticle from "@/components/AddArticle.vue";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Title",
          align: "Center",
          sortable: false,
          value: "title"
        },
        // { text: "description", value: "description", align: "Center" },
        { text: "Created At", value: "createdAt", align: "Center" },
        { text: "Actions", value: "Actions", align: "Center" }
      ],
      articles: [],
      state: "",
      count: 0
    };
  },
  props: ["newArticle"],
  methods: {
    createNewArticle: function() {
      this.count += 1;
      if (this.count % 2 === 0) {
        this.state = false;
      } else {
        this.state = true;
      }
    },
    getArticles() {
      let token = localStorage.getItem("token");
      if (token) {
        axios
          .get(`http://localhost:3000/articles`, {
            headers: {token: localStorage.getItem('token')}
          })
          .then(result => {
            this.articles = result.data.data;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        swal("You must be login", "", "info");
      }
    },
    deleteArticle(id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          if (result.value) {
            axios.delete(`http://localhost:3000/articles/delete/${id}`, {
              headers: {token: localStorage.getItem('token')}
            })
            .then(data => {
              swal("Deleted!", "Your file has been deleted.", "success")
              this.getArticles()
            })
            .catch(err => {

            })
          }
        }
      })
    }
  },
  created() {
    this.getArticles();
  },
  components: {
    AddArticle
  },
  watch: {
    newArticle: function() {
      // console.log('---- new created')
      this.getArticles();
    },
    articles: function() {
      return this.articles
    }
  }
};
</script>

<style>
.styleLink{
  text-decoration: none;
}
</style>
