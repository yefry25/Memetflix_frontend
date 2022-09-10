<template>
  <v-container fluid style="height: 100%; background: blue">
    <v-row>
      <v-col  class="orange" v-for="(favorito, i) in favoritos" :key="i">
          <v-card class="mx-auto" max-width="344">
            <h1>{{favorito.idPelicula}}</h1>
            <v-img src="" height="200px"></v-img>
            <v-card-title> {{}} </v-card-title>
            <v-card-actions>
              <v-btn color="orange lighten-2" text> Sinopsis </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <v-card-text>
                  {{}}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "pageFavoritos",
  data: () => ({
    favoritos: [],
    show:false
  }),
  methods: {
    traerFavoritos() {
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(header);
      axios
        .get("https://movies25.herokuapp.com/api/favoritos", header)
        .then((response) => {
          console.log(response);
          this.favoritos = response.data.favorito;
          console.log(this.favoritos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.traerFavoritos();
  },
};
</script>