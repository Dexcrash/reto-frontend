<template>
  <v-app style="background-color:#D1D1D1">
    <template>
      <!-- container with side-bar -->
      <v-container>
        <v-navigation-drawer
          app
          class="grey darken-4"
          dark
          permanent
          style="width:15%"
        >
        <!-- Logo of the app -->
          <v-row justify="center">
            <router-link to="/">
              <v-avatar class="my-5" size="200" tile>
                <v-img src="./assets/logoBonito.png"></v-img>
              </v-avatar>
            </router-link>
          </v-row>
          <!-- Items of sidebar -->
          <v-list>
            <router-link
              v-for="item in items"
              :key="item.title"
              :to="`${item.path}`"
            >
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list>
        </v-navigation-drawer>
      </v-container>
    </template>

    <!-- router view-->
    <v-content class="ml-5">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      items: [
        { title: "Tus Listas", icon: "mdi-view-dashboard", path: "/lists" },
        { title: "Descubre", icon: "mdi-image", path: "/colists" },
        { title: "About", icon: "mdi-help-box", path: "/about" }
      ]
    };
  }
};
</script>
