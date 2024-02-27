<template>
  <v-app light>
    <!-- <v-navigation-drawer
      color="blue accent-4"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      :class="{ 'text--white': $vuetify.theme.dark === false }"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="signOut()">
          <v-list-item-content>
            <v-list-item-title>logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-app-bar :clipped-left="clipped" fixed app color="blue accent-4">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-btn icon @click.stop="miniVariant = !miniVariant" color="white">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <div class="d-flex flex-grow-1" color="white"></div>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer" color="white">
        Jenisize-Test <v-icon color="white">mdi-chevron-down</v-icon>
      </v-btn>

      <v-spacer />
      <v-btn icon @click="signOut" color="white">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- <v-footer :absolute="!fixed" class="white" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  name: "DefaultLayout",
  inject: ["title"],
  data() {
    return {
      title: "Jenisize-Test",
      tab: 1,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    };
  },
  methods: {
    async signOut() {
      const auth = getAuth();
      await signOut(auth)
        .then(() => {
          console.log("Logout Successfully");
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          this.$router.push("/login"); //
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
};
</script>
