<template>
    <div class="register">
        <v-container grid-list-md flex>
            <div class="nav">
                <h1 style="background-color= red">BuLOG Brainstorming</h1>
            </div>
            <v-layout row wrap>
                <v-flex xs3>
                    <SideBar class="style-fixed"/>
                </v-flex>
                <v-layout column class="form-register">
                    <RegisterForm/>
                </v-layout>
            </v-layout>
        </v-container>
    </div>
    
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'
import SideBar from '@/components/SideBar.vue'

export default {
    name: 'register',
    components: {
        RegisterForm,
        SideBar
    },
    data() {
        return {
            
        }
    }
}
</script>

<style>
.form-register {
    padding-top: 50px;
}
.container {
    padding: 0px;
    margin: 0px
}

</style>
