<template>
  <v-app>
    <!-- Container row -->
    <v-row>
      <v-col cols="12">
        <v-card class="pa-2" flat elevation="2" tile>
          <v-row>
            <!-- Image column -->
            <v-col cols="12" sm="3">
              <v-img
                src="data:image/png;base64,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"
                class="white--text"
                height="200px"
              ></v-img>
            </v-col>
            <!-- Content column -->
            <v-col cols="12" sm="9">
              <v-card-title><h2 class="mt-10">Jenosize Test</h2></v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6"></v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="searchQuery"
                      hide-details
                      outlined
                      dense
                      flat
                      placeholder="Search"
                      @keyup.enter="getLocate()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2">
                    <v-btn icon @click="getLocate()">
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dynamic content rows -->
    <v-row justify="center">
      <v-col cols="12" sm="8" v-for="item in ggList" :key="item.id">
        <v-card class="pa-2" flat tile>
          <v-row>
            <v-col cols="12" sm="4">
              <v-img
                v-for="p in item.photos"
                :key="p.photo_reference"
                :src="`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${p.photo_reference}&key=AIzaSyD5jeVi1FPrZz01GXkG9NGs3OhUMsunSlU`"
                class="white--text"
                height="200px"
              ></v-img>
            </v-col>
            <v-col cols="12" sm="8">
              <v-card-title class="headline">{{ item.name }}</v-card-title>
              <v-card-text>
                Location: {{ item.formatted_address }}
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Footer -->
    <v-footer fixed padless class="white">
      <v-bottom-navigation background-color="white">
        Developed by Saharat Pghothongkom
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  title: "Hi",
  middleware: "auth",
  name: "resterantSearch",

  data() {
    return {
      searchQuery: "หมู",
      title: "หมู",
      ggList: [],
    };
  },
  methods: {
    getLocate() {
      console.log(this.searchQuery);
      this.$axios
        .get("/search", {
          params: { name: this.searchQuery },
        })
        .then((response) => {
          console.log(response);
          this.ggList = response.data;
          console.log(response.data[0].photos[0].photo_reference);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
