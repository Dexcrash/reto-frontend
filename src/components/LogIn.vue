<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="4">
        <v-card>
          <v-card-title>
            <span class="headline">Igresa con tu usuario</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="user"
                :counter="25"
                :rules="userRules"
                label="Usuario"
                required
              ></v-text-field>

              <v-text-field
                v-model="pass"
                :counter="25"
                :rules="passRules"
                label="Contraseña"
                required
              ></v-text-field>

              <v-row class="mx-auto">
                <v-btn :disabled="!valid" color="success" @click="validate">
                  Ingresar
                </v-btn>
                <v-btn color="error" to="/">
                  Cancelar
                </v-btn>
              </v-row>
              <small v-if="error">Error de usuario o contraseña</small>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  props: ["userLogged"],
  data() {
    return {
      valid: false,
      user: "",
      error: false,
      userRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 25) || "Name must be less than 25 characters"
      ],
      pass: "",
      passRules: [
        v => !!v || "Autor is required",
        v => (v && v.length <= 25) || "Name must be less than 25 characters"
      ]
    };
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        let response = await axios.post("http://localhost:3000/usersByPass/", {
          name: this.user,
          password: this.pass
        });
        if (response.data.id) {
          this.userLogged(response.data.id);
        } else {
          this.error = true;
        }
      }
    }
  }
};
</script>
