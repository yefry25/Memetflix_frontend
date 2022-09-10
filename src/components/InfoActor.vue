<template>
  <v-container fluid style="height: 100%; background: blue">
    <v-row>
      <v-col>
        <v-img :src="this.actor.foto"></v-img>

        <v-btn
          :loading="loading"
          :disabled="loading"
          color="blue-grey"
          class="ma-2 white--text"
          fab
          @click="loader = 'loading'"
          @change="subir"
          v-model="files"
        >
          <v-icon dark> mdi-cloud-upload </v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <h4>{{ this.actor.nombre }}</h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: "pageInfoActor",
  data: () => ({
    actor: [],
    files:[],
    loading: false,
    loader: null,
  }),
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
  methods: {
    traerActores() {
      this.actor = this.$store.state.actor;
      console.log(this.actor);
    },

    subir(e) {
      console.log(e);
      this.foto = this.files;
      console.log(this.foto);
      let fd = new FormData();
      fd.append("archivo", this.foto);
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(fd);
      axios
        .post(
          `https://movies25.herokuapp.com/api/pelicula/uploadinary/${this.$store.state.pelicula._id}`,
          fd,
          header
        )
        .then((response) => {
          console.log(response.data);
          this.$store.state.pelicula.foto =
            response.data.url; /* hacer esto con un state y un commit */
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
      this.traerActores()
    },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
