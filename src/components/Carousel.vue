<template>
  <v-container fluid class="fondo">
    <main>
        <div class="carousel-principal">
      <v-carousel
        height="40.62em"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(slide, i) in peliculas" :key="i">
          <v-img
            :src="slide.foto"
            gradient="rgba(0,0,0, .50) 0%, rgba(0,0,0, .50) 100%"
            class="carousel-img"
          ></v-img>
          <div class="contenedor">
            <h3 class="carousel-texto">
              {{ slide.tituloOriginal }}
            </h3>
            <p class="descripci">
              {{ slide.sinopsis }}
            </p>
            <button role="button" class="bot">
              <v-icon>mdi-play</v-icon> Reproducir
            </button>
            <button role="button" class="bot" v-on:click="detalle(slide)">
              <v-icon>mdi-information-outline</v-icon> Más información
            </button>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>
      <div class="peliculas-recomendadas contenedor">
        <!-- colocamos contenedor en la clase ya que en el css de contenedor tenemos los espaciados y centrados que queremos tener en genral para la pagina de carusel -->
        <div class="contenedor-titulo-controles">
          <h3>Peliculas recomendadas</h3>
          <div class="indicadores"></div>
        </div>
        <!-- este div esta vacio ya que utilizaremos javascript para mostrar los indicadores -->
        <div class="contenedor-principal">
          <button role="button" id="flecha-izquierda" class="flecha-izquierda">
            <v-icon>mdi-chevron-left</v-icon>
          </button>
          <div class="contenedor-carousel">
            <div class="carousel">
              <div class="pelicula" v-for="(img, i) in peliculas" :key="i">
                <a href="#">
                  <img :src="img.poster" alt="imagen-carousel" />
                </a>
              </div>
            </div>
          </div>
          <!-- shift + alt + flecha hacia abajo para duplicar lo que tengamos selecionado -->
          <button role="button" id="flecha-derecha" class="flecha-derecha">
            <v-icon>mdi-chevron-right</v-icon>
          </button>
        </div>
      </div>
    </main>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "pageCarousel",

  data: () => ({
    peliculas: [],
    idPelicula: {},
    idUsuario: {},
  }),

  methods: {
    detalle(movie) {
      this.$router.push("/pelicula");
      this.$store.dispatch("setPelicula", movie);
    },
    traerPeliculas() {
      axios
        .get("https://movies25.herokuapp.com/api/pelicula/get")
        .then((response) => {
          this.peliculas = response.data.pelicula;
          this.$store.dispatch("setMovie", response.data.pelicula);
          console.log(this.peliculas);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    favorito(pelicula) {
      this.idPelicula = pelicula._id;
      this.idUsuario = this.$store.state.datos._id;
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .post(
          "https://movies25.herokuapp.com/api/favoritos",
          { idPelicula: this.idPelicula, idUsuario: this.idUsuario },
          header
        )
        .then((response) => {
          console.log(response);
          Swal.fire({
            title: "Agregada exitosamente a favoritos",
            icon: "success",
          });

          this.$store.dispatch("setFavorito", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    carousel() {
      const fila = document.querySelector(".contenedor-carousel");
      const peliculas =
        document.querySelectorAll(
          ".pelicula"
        ); /* hacemos el queryselectorall para capturar todos los componentes */
      const flechaIzquierda = document.getElementById("flecha-izquierda");
      const flechaDerecha = document.getElementById("flecha-derecha");

      /* event listener para flecha derecha */

      flechaDerecha.addEventListener("click", () => {
        fila.scrollLeft += fila.offsetWidth;

        const indicadorActivo = document.querySelector(
          ".indicadores .activo"
        ); /* aqui estamos accediendo al indicador activo y lo guardamos en la constante */
        if (indicadorActivo.nextSibling) {
          /* estamos preguntando si indicador activo tiene un elemento a la derecha */
          indicadorActivo.nextSibling.classList.add(
            "activo"
          ); /* le estamos colocando la clase activo al elemento que se encuentre a la derecha del indicador que este activo, asi que al siguiente indicador le heredamos la clase activo por lo tanto el color rojo */
          indicadorActivo.classList.remove(
            "activo"
          ); /* y aqui al indicador que estaba activo le quitamos la clase activo para heredarse a su elemento que se encuentre a la derecha */
        }
      });

      /* event listener para flecha izquierda */

      flechaIzquierda.addEventListener("click", () => {
        fila.scrollLeft -= fila.offsetWidth;

        const indicadorActivo = document.querySelector(
          ".indicadores .activo"
        ); /* aqui estamos accediendo al indicador activo y lo guardamos en la constante */
        if (indicadorActivo.previousSibling) {
          /* estamos preguntando si indicador activo tiene un elemento a la izquierda */
          indicadorActivo.previousSibling.classList.add(
            "activo"
          ); /* le estamos colocando la clase activo al elemento que se encuentre a la izquierda del indicador que este activo, asi que al anterior indicador le heredamos la clase activo por lo tanto el color rojo */
          indicadorActivo.classList.remove(
            "activo"
          ); /* y aqui al indicador que estaba activo le quitamos la clase activo para heredarse a su elemento que se encuentre a la izquierda */
        }
      });

      /* paginacion */

      const numeroPaginas = Math.ceil(
        peliculas.length / 5
      ); /* el math.ceil lo utilizamos para redondear hacia arriba, para poder tener una correcta paginacion */

      for (let i = 0; i < numeroPaginas; i++) {
        const indicador = document.createElement("button");

        if (i === 0) {
          indicador.classList.add("activo");
        }
        document.querySelector(".indicadores").appendChild(indicador);
        indicador.addEventListener("click", (e) => {
          fila.scrollLeft = i * fila.offsetWidth;

          document
            .querySelector(".indicadores .activo")
            .classList.remove(
              "activo"
            ); /* con esta linea de codigo accedemos a la clase activo y despues la eliminamos */

          e.target.classList.add(
            "activo"
          ); /* aqui accedemos al indicador que fue clickeado para poder agregarle la clase activo y asi colocarle color rojo */
        });

        /* hover */

        peliculas.forEach((pelicula) => {
          /* por cada pelicula me ejecute una funcion */
          pelicula.addEventListener("mouseenter", (e) => {
            /* por cada pelicula queremos que haga un eventlistener que ejecute una funcion cuando pase el mouse por la pelicula */
            const elemento =
              e.currentTarget; /* estamos guardando el elemento al cual le pasamos el cursor por encima */
            setTimeout(() => {
              peliculas.forEach((pelicula) => {
                pelicula.classList.remove("hover");
              }); /* aqui a todas las peliculas las busca y les quita el hover */
              elemento.classList.add(
                "hover"
              ); /* y por ultimo al elemento que le pasamos el cursor por encima le agregamos el efecto hover */
            }, 300);
          });
        });

        fila.addEventListener("mouseleave", () => {
          peliculas.forEach((pelicula) => {
            pelicula.classList.remove("hover");
          });
        });
      }
    },
  },
  computed: {
    clasificar() {
      return this.peliculas.filter(
        (e) => e.genero == "aventura, misterio, drama"
      );
    },
    clasificarCervezas() {
      return this.peliculas.filter(
        (e) => e.genero == "accion, ciencia ficción"
      );
    },
    clasificarInfantil() {
      return this.peliculas.filter((e) => e.genero == "infantil");
    },
  },
  created() {
    this.traerPeliculas();
  },
  mounted() {
    this.carousel();
  },
};
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

.fondo {
  background: #141414;
  font-family: "Open Sans", sans-serif;
}

.contenedor {
  width: 90%;
  margin: auto;
}

.carousel-principal {
  position: relative;
  margin-bottom: 3.12em;
  display: flex;
  align-items: end;
  font-size: 16px;

  /* background-color: green; */
}

.carousel-img {
  position: absolute;
  width: 100%;
  height: 100%;
}

.carousel-principal .contenedor {
  position: absolute;
  bottom: 0;
  margin: 0 3.75em;
  margin-bottom: 6.25em;
  /* background-color: red; */
}

.carousel-principal .carousel-texto {
  font-size: 3.12em; /* 50px */
  margin-bottom: 0.4em; /* 20px */
  color: #fff;
}

.carousel-principal .descripci {
  font-size: 1em; /* 16px */
  line-height: 1.75em; /*18px; */
  max-width: 50%;
  margin-bottom: 1.25em; /* 20px */
  color: #fff;
}

.carousel-principal .bot {
  background: rgba(0, 0, 0, 0.5); /* negro con transparencia */
  border: none;
  border-radius: 0.31em; /* 5px */
  padding: 0.93em 1.87em; /* 15px  arriba*/ /* 30px  izquierda a derecha*/
  color: #fff;
  margin-right: 1.25em; /* 20px */
  cursor: pointer;
  transition: 0.3s ease all; /* cuando pase el cursor cambie el color y que tenga un efecto que dure 3 segundos con funcion de tiempo ease para todas las propiedades */
  font-size: 1.12em; /* 10px */
}

.carousel-principal .bot:hover {
  background: #fff;
  color: #000;
}

.carousel-principal .bot v-icon {
  margin-right: 1.25em; /* 20px */
}

/* media queries */

@media screen and (max-width: 800px) {
  .carousel-principal {
    font-size: 14px;
  }

  .carousel-principal .descripci {
    max-width: 100%;
  }
}

/* contenedor titulo y controles */

.contenedor-titulo-controles {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.contenedor-titulo-controles h3 {
  color: #fff;
  font-size: 30px;
}

.contenedor-titulo-controles .indicadores button {
  background: #fff;
  height: 3px;
  width: 10px;
  cursor: pointer;
  border: none;
  margin-right: 2px;
}

.contenedor-titulo-controles .indicadores button:hover,
.contenedor-titulo-controles .indicadores button.activo {
  background: red;
}

/* contenedor principal y flechas */

.peliculas-recomendadas {
  margin-bottom: 70px;
}

.peliculas-recomendadas .contenedor-principal {
  display: flex;
  align-items: center;
  position: relative;
}

.peliculas-recomendadas .contenedor-principal .flecha-izquierda,
.peliculas-recomendadas .contenedor-principal .flecha-derecha {
  position: absolute;
  border: none;
  background: rgba(
    0,
    0,
    0,
    0.3
  ); /* el 0.3 es la opacidad de la transparencia del color */
  font-size: 40px;
  height: 50%;
  top: calc(50% - 25%);
  line-height: 40px;
  width: 50px;
  color: #fff;
  cursor: pointer;
  z-index: 500; /* esto es para asegurarnos que las flechas queden arriba de los elementos */
  transition: 0.2s ease all;
}

.peliculas-recomendadas .contenedor-principal .flecha-izquierda:hover,
.peliculas-recomendadas .contenedor-principal .flecha-derecha:hover {
  background: rgba(0, 0, 0, 0.9);
}

.peliculas-recomendadas .contenedor-principal .flecha-izquierda {
  left: 0;
}
.peliculas-recomendadas .contenedor-principal .flecha-derecha {
  right: 0;
}

/* carousel */

.peliculas-recomendadas .contenedor-carousel {
  width: 100%;
  padding: 20px 0; /* el padding se coloca para que el overflow hidden no interfiera en el hover de las imagenes, ya que si no lo hacemos la imagen se cortaría cuando se agrandara al pasar sobre ella */ /* el 20px lo hace arriba y abajo, y el 0 lo hace a la izquierda y derecha */
  overflow: hidden; /* con esto todo lo que salga del 100% estara oculto */
  scroll-behavior: smooth; /* nos permite cambiar el comportamiento del scroll */
}

.peliculas-recomendadas .contenedor-carousel .carousel {
  display: flex;
  flex-wrap: nowrap;
}

.peliculas-recomendadas .contenedor-carousel .carousel .pelicula {
  min-width: 20%;
  transition: 0.3s ease all; /* esto es para el efecto hover */
  box-shadow: 5px, 5px, 10px 10px rgba(0, 0, 0, 0.3);
}

.peliculas-recomendadas .contenedor-carousel .carousel .pelicula.hover {
  transform: scale(1.2); /* escalamos la imagen y la hacemos más grande */
  transform-origin: center; /* con este hacemos que la imagen escale desde el centro hacia afuera proporcionalmente */
}

.peliculas-recomendadas .contenedor-carousel .carousel .pelicula img {
  width: 100%;
  vertical-align: top; /* para quitar un margen que colocan los navegadores */
}

/* media queries  */

@media screen and (max-width: 800px) {
  .pelicula-principal {
    font-size: 14px;
  }
  .pelicula-principal .descripcion {
    max-width: 100%;
  }

  .peliculas-recomendadas .contenedor-carousel {
    overflow: visible; /* hacemos el overflow visible para que no recorte los bordes cuando se generen las columnas */
  }

  .peliculas-recomendadas .contenedor-carousel .carousel {
    display: grid;
    grid-template-columns: repeat(
      3,
      1fr
    ); /* hace tres columnas y el 1fr las hace del mismo tamaño las 3 columnas */
    gap: 20px; /* este es el espaciado de cada elemento en el grid de columnas */
  }

  .peliculas-recomendadas .indicadores,
  .peliculas-recomendadas .flecha-izquierda,
  .peliculas-recomendadas .flecha-derecha {
    display: none;
  }
}

@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:wght@400;600&display=swap");
</style>
