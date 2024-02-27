<template>
  <v-app>
    <v-container>
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="4" v-for="(i, index) in cells" :key="index">
          <v-card
            style="height: 250px"
            class="d-flex flex-column align-center justify-center"
            @click="play(index + 1)"
            :disabled="i == 'X' || i == 'O'"
          >
            <v-icon size="100" color="green" v-show="i == 'X'">mdi-dog</v-icon>
            <v-icon size="100" color="error" v-show="i == 'O'">mdi-cat</v-icon>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
      cells: ["", "", "", "", "", "", "", "", ""],
    };
  },
  methods: {
    play(num) {
      this.$axios
        .post("/api/play", { position: num })
        .then((response) => {
          console.log(response.data);
          this.cells = response.data.board;
          if (response.data.result == "You win!") {
            this.$swal({
              title: "You win!",
              text: ";)",
              icon: "success",
              confirmButtonText: "OK",
            });
            this.cells = ["", "", "", "", "", "", "", "", ""];
          } else if (response.data.result == "Bot wins!") {
            this.$swal({
              title: "Bot wins!",
              text: ";)",
              icon: "error",
              confirmButtonText: "OK",
            });
            this.cells = ["", "", "", "", "", "", "", "", ""];
          } else if (response.data.result == "Game continues...") {
            console.log("NEXT");
          } else {
            this.$swal({
              title: "เสมอ",
              text: ";)",
              icon: "error",
              confirmButtonText: "OK",
            });
            this.cells = ["", "", "", "", "", "", "", "", ""];
          }
        })
        .catch((error) => {
          console.log(error.response.data.error);
          this.$swal({
            title: "กรุณาเลือกช่องว่าง!",
            text: ";)",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },
  },
};
</script>
<style>
.x-cell {
  color: red;
}
.o-cell {
  color: blue;
}
</style>
