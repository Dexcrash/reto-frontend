<template>
  <v-row>
    <v-col v-if="edit" cols="12">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Add Song</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Agregar Cancion</span>
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
                v-model="author"
                :counter="25"
                :rules="authorRules"
                label="Autor*"
                required
              ></v-text-field>

              <v-text-field
                v-model="album"
                :counter="15"
                :rules="albumRules"
                label="Nombre del Album*"
                required
              ></v-text-field>

              <v-text-field
                v-model="url"
                :rules="urlRules"
                label="Url de youtube*"
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
      <v-btn
        :disabled="selectedSong === null"
        color="success"
        @click="deleteSong"
      >
        Borrar
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">Nombre</th>
              <th class="text-left">Artista</th>
              <th class="text-left">Álbum</th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(song, index) in songs"
              :key="song.name"
              @click="selectSong(song)"
              :class="[
                { selected: song === selectedSong },
                { even: index % 2 == 0 }
              ]"
            >
              <td>
                <v-avatar class="ma-1" size="50" tile>
                  <v-img :src="song.image"></v-img>
                </v-avatar>
              </td>
              <td>{{ song.name }}</td>
              <td>{{ song.artist }}</td>
              <td>{{ song.album }}</td>
              <td>
                <v-btn :href="song.url" target="_blank" color="red">
                  YT
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>
<script>
import axios from "axios";

export default {
  props: ["edit"],
  data() {
    return {
      songs: [],
      dialog: false,
      valid: false,
      selectedSong: null,
      title: "",
      titleRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 25) || "Name must be less than 25 characters"
      ],
      author: "",
      authorRules: [
        v => !!v || "Autor is required",
        v => (v && v.length <= 25) || "Name must be less than 25 characters"
      ],
      album: "",
      albumRules: [
        v => !!v || "Album is required",
        v => (v && v.length <= 15) || "Name must be less than 15 characters"
      ],
      url: "",
      urlRules: [v => !!v || "URL is required"],
      image: "",
      imageRules: [v => !!v || "Image is required"]
    };
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        await axios
          .post(
            "http://localhost:3000/lists/" + this.$route.params.id + "/songs",
            {
              name: this.title,
              artist: this.author,
              album: this.album,
              url: this.url,
              image: this.image
            }
          )
          .catch(function(error) {
            // eslint-disable-next-line no-console
            console.log(error);
          });
        let songs = this.getSongs();
        this.songs = songs.data;
        this.dialog = false;
      }
    },
    reset() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    async deleteSong() {
      await axios.delete("http://localhost:3000/songs/" + this.selectedSong.id);
      this.getSongs();
    },
    selectSong(song) {
      if (this.edit) {
        if (this.selectedSong == song) {
          this.selectedSong = null;
        } else {
          this.selectedSong = song;
        }
      }
    },
    async getSongs() {
      let songs = await axios.get(
        "http://localhost:3000/lists/" + this.$route.params.id + "/songs"
      );
      this.songs = songs.data;
    }
  },
  created() {
    this.getSongs();
  }
};
</script>

<style scoped>
.selected {
  background-color: orange !important;
}
.even {
  background-color: #505050;
}
</style>
