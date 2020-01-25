<template>
  <v-container>
    <!-- Component with general info of list -->
    <InfoList v-bind:name="title" v-bind:description="description" />
    <!-- Component with list of songs of the music list -->
    <SongsList edit="true" />
  </v-container>
</template>

<script>
// @ is an alias to /src
import InfoList from "../components/InfoList.vue";
import SongsList from "../components/SongsList.vue";
import axios from "axios";

export default {
  components: {
    InfoList,
    SongsList
  },
  name: "list",
  data() {
    return {
      title: "",
      description: "",
      songs: []
    };
  },
  methods: {
    //get general info of the list
    async getList() {
      let list = await axios.get(
        "https://reto-back.herokuapp.com/lists/" + this.$route.params.id
      );
      this.title = list.data.name;
      this.description = list.data.description;
    }
  },
  created() {
    this.getList();
  }
};
</script>
