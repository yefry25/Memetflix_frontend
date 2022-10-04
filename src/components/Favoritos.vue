<template>
  <v-container fluid style="height: 100%;">
    <v-row>
      <v-col  class="" v-for="(favorito, i) in favoritos" :key="i">
          <v-card class="mx-auto" max-width="344">
            <v-img :src="favorito.idPelicula.foto" height="200px"></v-img>
            <v-card-title> {{favorito.idPelicula.tituloOriginal}} </v-card-title>
            <v-card-actions>
            </v-card-actions>
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