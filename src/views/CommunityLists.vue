<template>
  <v-container class="ml-5">
    <h1>Descubre Listas Unicas</h1>
    <v-row>
      <!-- Lis of Muisic List of all DataBase -->
      <v-col xs="12" md="4" v-for="(item, index) in items" :key="index">
        <router-link class="card" :to="`/colist/${item.id}`">
          <v-card dark>
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            >
              <v-card-title>{{ item.name }}</v-card-title>
            </v-img>

            <v-card-text class="white--text">
              <p>{{ item.description }}</p>
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "colists",
  data() {
    return {
      items: [],
      logged: false,
      userId: null
    };
  },
  methods: {
    //get all music lists from database
    async getLists() {
      let lists = await axios.get("https://reto-back.herokuapp.com/lists");
      this.items = lists.data;
    }
  },
  created() {
    this.getLists();
  }
};
</script>
