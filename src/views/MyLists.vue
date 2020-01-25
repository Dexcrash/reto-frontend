<template>
  <v-container>
    <div v-if="!logged">
      <LogIn :userLogged="userLogged" />
    </div>

    <div v-else>
      <h1>Mis Listas</h1>
      <v-row>
        <v-col cols="12">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">Agregar List</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Agregar Lista</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    v-model="title"
                    :counter="25"
                    :rules="titleRules"
                    label="Titulo*"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="description"
                    :rules="descriptionRules"
                    label="Description*"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="image"
                    :rules="imageRules"
                    label="Url de la caratula*"
                    required
                  ></v-text-field>

                  <small>*indicates required field</small>
                  <v-row class="mx-auto">
                    <v-btn :disabled="!valid" color="success" @click="validate">
                      Agregar
                    </v-btn>
                    <v-btn color="error" @click="reset">
                      Cancelar
                    </v-btn>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
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
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import LogIn from "../components/LogIn";

export default {
  name: "lists",
  components: {
    LogIn
  },
  data() {
    return {
      items: [],
      logged: false,
      userId: null,
      dialog: false,
      valid: false,
      title: "",
      titleRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 25) || "Name must be less than 25 characters"
      ],
      description: "",
      descriptionRules: [v => !!v || "Description is required"],
      image: "",
      imageRules: [v => !!v || "Image is required"]
    };
  },
  methods: {
    async getLists() {
      let lists = await axios.get(
        "http://localhost:3000/listsByUser/" + this.userId
      );
      // eslint-disable-next-line no-console
      this.items = lists.data;
    },
    userLogged(id) {
      this.userId = id;
      this.logged = true;
      this.getLists();
    },
    async validate() {
      if (this.$refs.form.validate()) {
        await axios
          .post("https://reto-back.herokuapp.com/lists/", {
            name: this.title,
            description: this.description,
            user_id: this.userId
          })
          .catch(function(error) {
            // eslint-disable-next-line no-console
            console.log(error);
          });
        this.getLists();
        this.dialog = false;
      }
    },
    reset() {
      this.$refs.form.reset();
      this.dialog = false;
    }
  }
};
</script>
