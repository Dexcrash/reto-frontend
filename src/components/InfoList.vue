<template>
  <v-row>
    <!-- General info of a List -->
    <v-col xs="12" md="4">
      <v-img
        class="white--text align-end"
        height="300px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
      </v-img>
    </v-col>
    <v-col xs="12" md="8" class="mt-auto">
      <h1>{{ name }}</h1>
      <p>{{ description }}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "infoList",
  props: {
    name: String,
    description: String
  }
};
</script>
