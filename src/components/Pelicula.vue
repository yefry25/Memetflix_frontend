<template>
  <v-container fluid style="height: 100%; padding: 0">
    <v-row>
      <v-col>
        <div class="fondo">
          <v-img
            :src="this.detallePelicula.foto"
            gradient="rgba(0,0,0, .70) 0%, rgba(0,0,0, .70) 100%"
          ></v-img>
          <div class="contenedor-poster">
            <v-img :src="this.detallePelicula.poster" class="poster"></v-img>
            <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
              hide-input
              v-model="poster"
              @change="subir()"
              class="boton-avatar"
              rounded
              color="white"
              background-color="white"
            ></v-file-input>
            <b-btn class="boton-editar" @click="editar">Editar</b-btn>
          </div>

          <div class="contenedor-detalle">
            <h3 class="titulo">{{ this.detallePelicula.tituloOriginal }}</h3>

            <p class="sinopsis">
              Vista general: <br />
              {{ this.detallePelicula.sinopsis }}
            </p>
            <p>{{ this.detallePelicula.genero }}</p>
            <p>Director: <br />{{ this.detallePelicula.director }}</p>
            <p>Escritor: <br />{{ this.detallePelicula.escritor }}</p>
          </div>

          <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
              hide-input
              v-model="foto"
              @change="subirFoto()"
              rounded
              color="white"
              class="boton-file"
            ></v-file-input>

            <v-btn class="boton-borrar" @click="borrar" rounded><v-icon>mdi-delete</v-icon></v-btn>
        </div>
      </v-col>
      <v-col>
        <div>
          <v-hover v-slot="{ hover }">
            <v-card
              max-width="300px"
              max-height="400px"
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
              padding="0"
              icon
            >
              <v-img :src="actores.foto">
                <v-card-title class="text-h6 white--text">
                  <v-row class="fill-height flex-column">
                    <p v-if="hover">{{ actores.nombre }}</p>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "pagePelicula",

  data: () => ({
    img: "",
    files: [],
    selection: 1,
    actores: [],
    rating: null,
    detallePelicula: [],
    transparent: "rgba(255, 255, 255, 0)",
    repartoPrincipal: [],
    poster: [],
    foto:[]
  }),

  methods: {
    traerPeliculas() {
      this.detallePelicula = this.$store.state.pelicula;
      this.repartoPrincipal = this.$store.state.pelicula.repartoPrincipal;
      /* console.log(this.detallePelicula); */
      /* console.log(this.repartoPrincipal[0].act); */
    },
    subir() {
      console.log(this.poster);
      let fd = new FormData();
      fd.append("archivo", this.poster);
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(this.$store.state.pelicula._id);
      console.log(fd);
      axios
        .post(
          `https://movies25.herokuapp.com/api/pelicula/uploadinary/poster/${this.$store.state.pelicula._id}`,
          fd,
          header
        )
        .then((response) => {
          console.log(response.data);
          this.$store.state.pelicula.poster = response.data.url; /* hacer esto con un state y un commit */
        })
        .catch((error) => {
          console.log(error);
        });
    },
    subirFoto() {
      console.log(this.foto);
      let fd = new FormData();
      fd.append("archivo", this.foto);
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(this.$store.state.pelicula._id);
      console.log(fd);
      axios
        .post(
          `https://movies25.herokuapp.com/api/pelicula/uploadinary/${this.$store.state.pelicula._id}`,
          fd,
          header
        )
        .then((response) => {
          console.log(response.data);
          this.$store.state.pelicula.foto = response.data.url; /* hacer esto con un state y un commit */
        })
        .catch((error) => {
          console.log(error);
        });
    },
    mostrarActores() {
      axios
        .post("https://movies25.herokuapp.com/api/actores/id", {
          id: this.repartoPrincipal[0].act,
        })
        .then((response) => {
          /* console.log(response.data.actores); */
          this.actores = response.data.actores;
          console.log(this.actores);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editar() {
      this.$router.push('/formuPelicula')
      console.log(this.$store.state.pelicula._id);
    },
    borrar(){
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(header);
      console.log(this.detallePelicula._id);
      axios
        .post(
          `https://movies25.herokuapp.com/api/actores/delete/${this.detallePelicula._id}`,header)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  created() {
    this.traerPeliculas();
    this.mostrarActores();
  },
};
</script>

<style scoped>
.fluid {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

.show-btns {
  color: rgb(226, 226, 226) !important;
}

.fondo {
  position: relative;
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
}

.fondo .contenedor-poster {
  position: absolute;
  top: 2.1875em;
  bottom: 2.1875em;
  min-width: 18.75em;
  min-height: 31.25em;
  background-color: rgb(255, 238, 238);
  left: 5em;
  border-radius: 1.125em;
  color: #fff;
}

.poster {
  position: absolute;
  font-size: 16px;
  border-radius: 1.125em;
  height: 100%;
}

.contenedor-detalle {
  font-size: 16px;
  position: absolute;
  left: 37.5em;
  color: #fff;
  /* background-color: green; */
  top: 7.5em;
  left: 25.625em;
  right: 5em;
}

.titulo {
  color: #fff;
  margin-bottom: 20px;
  font-size: 50px;
}

.boton {
  margin-bottom: 0;
  margin-left: 20px;
  border-radius: 10px;
}

.boton-file {
  position: absolute;
  top: 5px;
  background-color: #fff;
  /* border-radius: 40px; */
  padding-left: 8px;
  padding-bottom: 5px;

}

.boton-editar {
  position: absolute;
  top:50px;
}

.boton-borrar {
  position: absolute;
  top: 70px;
  background: black;
}

/* media queries  */

@media screen and (max-width: 1030px) {
  .fondo {
    font-size: 14px;
  }
}
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:wght@400;600&display=swap");
</style>
