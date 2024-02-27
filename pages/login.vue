<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signInWithEmail">
              <v-text-field
                label="Email"
                prepend-icon="mdi-email"
                type="email"
                v-model="email"
              ></v-text-field>
              <v-text-field
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-btn color="success" block type="submit">Login</v-btn>
            </v-form>
            <v-row justify="center" class="mt-2">
              <v-col justify="center">
                <v-btn
                  color="blue-grey lighten-4"
                  @click="signInWithGoogle"
                  block
                  ><v-icon color="error"> mdi-google </v-icon> Google
                </v-btn>
              </v-col>
              <v-col justify="center">
                <v-btn color="primary" @click="signInWithFacebook" block
                  ><v-icon> mdi-facebook </v-icon> Facebook</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import app from "~/plugins/firebase.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    if (process.client) {
      const accessToken = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");
      if (accessToken || user) {
        console.log("is logged in");
        this.$router.push("/"); // Use this.$router.push instead of redirect
      }
    }
  },
  methods: {
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      await signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          const userx = result.user;
          localStorage.setItem("user", JSON.stringify(userx));
          localStorage.setItem(
            "accessToken",
            JSON.stringify(userx.accessToken)
          );
          console.log(JSON.parse(localStorage.getItem("user")));
          console.log(JSON.parse(localStorage.getItem("accessToken")));
          this.$router.push("/"); // Use
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signInWithFacebook() {
      const auth = getAuth();
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const userx = result.user;
          localStorage.setItem("user", JSON.stringify(userx));
          localStorage.setItem(
            "accessToken",
            JSON.stringify(userx.accessToken)
          );
          console.log(JSON.parse(localStorage.getItem("user")));
          console.log(JSON.parse(localStorage.getItem("accessToken")));
          this.$router.push("/"); // Use
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signUpWithEmail() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },

    signInWithEmail() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const userx = userCredential.user;
          // const userx = result.user;
          localStorage.setItem("user", JSON.stringify(userx));
          localStorage.setItem(
            "accessToken",
            JSON.stringify(userx.accessToken)
          );
          console.log(JSON.parse(localStorage.getItem("user")));
          console.log(JSON.parse(localStorage.getItem("accessToken")));
          this.$router.push("/"); // Use
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },
  },
};
</script>
