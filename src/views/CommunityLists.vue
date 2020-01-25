<template>
  <v-container>
    <h1>Descubre Listas Unicas</h1>
    <v-row>
      <v-col xs="12" md="4" v-for="(item, index) in items" :key="index">
        <router-link class="card" :to="`/list/${item.id}`">
          <v-card dark>
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
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
    async getLists() {
      let lists = await axios.get("https://reto-back.herokuapp.com/lists");
      // eslint-disable-next-line no-console
      console.log(lists.data);
      this.items = lists.data;
    }
  },
  created() {
    this.getLists();
  }
};
</script>
