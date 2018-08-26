<template>
    <div class="profile">
        <SideBar/>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue"
import axios from "axios"
import swal from "sweetalert2"

export default {
  name: "profile",
  data() {
    return {

    }
  },
  components: {
    SideBar
  },
  created() {
    let token = localStorage.getItem("token")
    axios
      .get(`http://localhost:3000/users?accessToken=${token}`)
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
};
</script>

<style>
</style>
