<template >
  <v-container fluid style="height: 100%; background: #dececb">
    <v-row class="justify-center">
      <v-col cols="6">
        <form class="form">
          <v-text-field
            v-model="tituloOriginal"
            :error-messages="originalErrors"
            label="titulo original"
            required
            @input="$v.tituloOriginal.$touch()"
            @blur="$v.tituloOriginal.$touch()"
            color="white"
            background-color="#d7dbdd"
            flat
            rounded
          ></v-text-field>
          <v-text-field
            v-model="tituloEspanol"
            :error-messages="espanolErrors"
            label="titulo en español"
            required
            @input="$v.tituloEspanol.$touch()"
            @blur="$v.tituloEspanol.$touch()"
            color="white"
            background-color="#d7dbdd"
            flat
            rounded
          ></v-text-field>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Picker in dialog"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-text-field
            v-model="genero"
            :error-messages="generoErrors"
            label="genero"
            required
            @input="$v.genero.$touch()"
            @blur="$v.genero.$touch()"
            color="white"
            background-color="#d7dbdd"
            flat
            rounded
          ></v-text-field>
          <v-text-field
            v-model="calificacion"
            :error-messages="calificacionErrors"
            label="calificacion"
            required
            @input="$v.calificacion.$touch()"
            @blur="$v.calificacion.$touch()"
            color="white"
            background-color="#d7dbdd"
            flat
            rounded
          ></v-text-field>
          <v-text-field
            v-model="sinopsis"
            :error-messages="sinopsisErrors"
            label="sinopsis"
            required
            @input="$v.sinopsis.$touch()"
            @blur="$v.sinopsis.$touch()"
            color="white"
            background-color="#d7dbdd"
            flat
            rounded
          ></v-text-field>
          <v-text-field
            v-model="director"
            :error-messages="directorErrors"
            label="director"
            required
            @input="$v.director.$touch()"
            @blur="$v.director.$touch()"
            color="white"
            background-color="#d7dbdd"
            flat
            rounded
          ></v-text-field>
          <v-text-field
            v-model="escritor"
            :error-messages="escritorErrors"
            label="escritor"
            required
            @input="$v.escritor.$touch()"
            @blur="$v.escritor.$touch()"
            color="white"
            background-color="#d7dbdd"
            flat
            rounded
          ></v-text-field>
          <v-dialog
            class="dialogo"
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" @click="actors"> Reparto </v-btn>
            </template>
            <v-row class="ml-0">
              <v-col class="white " v-for="(actor, i) in actores" :key="i" >
                <v-hover v-slot="{ hover }">
                  <v-card
                    class="card"
                    max-width="200"
                    max-height="200"
                    :elevation="hover ? 12 : 2"
                    :class="{ 'on-hover': hover }"
                  >
                    <v-img :src="actor.foto" max-width="200" max-height="200">
                      <v-card-title>
                        <v-row class="fill-height flex-column">
                          <h7 class="titulo" v-if="hover">{{ actor.nombre }}</h7>
                          <v-btn class="boton" v-if="hover" @click="reparto(actor)">Agregar</v-btn>
                        </v-row>
                      </v-card-title>
                    </v-img>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
            <v-col class="white">
              <v-text-field
                class="white"
                v-model="personaje"
                :error-messages="personajeErrors"
                label="PERSONAJE"
                required
                @input="$v.personaje.$touch()"
                @blur="$v.personaje.$touch()"
                color="white"
                background-color="#d7dbdd"
                flat
                rounded
              ></v-text-field>
              <v-text-field
                class="white"
                v-model="rol"
                :error-messages="rolErrors"
                label="ROL"
                required
                @input="$v.rol.$touch()"
                @blur="$v.rol.$touch()"
                color="white"
                background-color="#d7dbdd"
                flat
                rounded
              ></v-text-field>
            </v-col>

            <v-btn style="color:white; background:black;" text @click="dialog = false">
              Close
            </v-btn>
          </v-dialog>
          <v-text-field
            v-model="estado"
            :error-messages="estadoErrors"
            label="estado"
            required
            @input="$v.estado.$touch()"
            @blur="$v.estado.$touch()"
            color="white"
            background-color="#d7dbdd"
            flat
            rounded
          ></v-text-field>
          <v-text-field
            v-model="idiomaOriginal"
            :error-messages="idiomaErrors"
            label="idioma original"
            required
            @input="$v.idiomaOriginal.$touch()"
            @blur="$v.idiomaOriginal.$touch()"
            color="white"
            background-color="#d7dbdd"
            flat
            rounded
          ></v-text-field>
          <v-text-field
            v-model="presupuesto"
            :error-messages="presupuestoErrors"
            label="presupuesto"
            required
            @input="$v.presupuesto.$touch()"
            @blur="$v.presupuesto.$touch()"
            color="white"
            background-color="#d7dbdd"
            flat
            rounded
          ></v-text-field>
          <v-text-field
            v-model="ingresos"
            :error-messages="ingresosErrors"
            label="ingresos"
            required
            @input="$v.ingresos.$touch()"
            @blur="$v.ingresos.$touch()"
            color="white"
            background-color="#d7dbdd"
            flat
            rounded
          ></v-text-field>
          <v-btn class="mr-4" @click="registrar" id="boton2">Agregar</v-btn>
          <v-btn id="boton2" @click="editar">Editar</v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, numeric, minLength } from "vuelidate/lib/validators";
import Swal from "sweetalert2";

export default {
  name: "pageFormuPelicula",

  mixins: [validationMixin],

  data: () => ({
    actores: [],
    tituloOriginal: "",
    tituloEspanol: "",
    fechaLanzamiento: "",
    genero: "",
    calificacion: null,
    sinopsis: "",
    director: "",
    escritor: "",
    repartoPrincipal: [],
    personaje: "",
    rol: "",
    estado: "",
    idiomaOriginal: "",
    presupuesto: null,
    ingresos: null,
    dialog: false,
    show: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    modal: false,
  }),

  validations: {
    tituloOriginal: { required },
    tituloEspanol: { required },
    fechaLanzamiento: { required },
    genero: { required },
    calificacion: { required, numeric },
    sinopsis: { required, minLength: minLength(10) },
    director: { required },
    escritor: { required },
    estado: { required },
    idiomaOriginal: { required },
    presupuesto: { required, numeric },
    ingresos: { required, numeric },
    personaje: { required },
    rol: { required },
  },

  computed: {
    originalErrors() {
      const errors = [];
      if (!this.$v.tituloOriginal.$dirty) return errors;
      !this.$v.tituloOriginal.required &&
        errors.push("Titulo original es requerido.");
      return errors;
    },
    espanolErrors() {
      const errors = [];
      if (!this.$v.tituloEspanol.$dirty) return errors;
      !this.$v.tituloEspanol.required &&
        errors.push("Titulo español es requerido.");
      return errors;
    },
    fechaErrors() {
      const errors = [];
      if (!this.$v.fechaLanzamiento.$dirty) return errors;
      !this.$v.fechaLanzamiento.required && errors.push("Fecha es requerida.");
      return errors;
    },
    generoErrors() {
      const errors = [];
      if (!this.$v.genero.$dirty) return errors;
      !this.$v.genero.required && errors.push("Genero es requerido.");
      return errors;
    },
    calificacionErrors() {
      const errors = [];
      if (!this.$v.calificacion.$dirty) return errors;
      !this.$v.calificacion.required &&
        errors.push("Calificacion es requerido.");
      !this.$v.calificacion.numeric &&
        errors.push("Calificacion solo acepta caracteres numericos");
      return errors;
    },
    sinopsisErrors() {
      const errors = [];
      if (!this.$v.sinopsis.$dirty) return errors;
      !this.$v.sinopsis.required && errors.push("Sinopsis es requerido.");
      !this.$v.sinopsis.minLength &&
        errors.push("La sinopsis debe tener minimo 10 caracteres.");
      return errors;
    },
    directorErrors() {
      const errors = [];
      if (!this.$v.director.$dirty) return errors;
      !this.$v.director.required && errors.push("Director es requerido.");
      return errors;
    },
    escritorErrors() {
      const errors = [];
      if (!this.$v.escritor.$dirty) return errors;
      !this.$v.escritor.required && errors.push("Escritor es requerido.");
      return errors;
    },
    estadoErrors() {
      const errors = [];
      if (!this.$v.estado.$dirty) return errors;
      !this.$v.estado.required && errors.push("Estado es requerido.");
      return errors;
    },
    idiomaErrors() {
      const errors = [];
      if (!this.$v.idiomaOriginal.$dirty) return errors;
      !this.$v.idiomaOriginal.required && errors.push("Idioma es requerido.");
      return errors;
    },
    presupuestoErrors() {
      const errors = [];
      if (!this.$v.presupuesto.$dirty) return errors;
      !this.$v.presupuesto.required && errors.push("Presupuesto es requerido.");
      !this.$v.presupuesto.numeric &&
        errors.push("Presupuesto solo acepta caracteres numericos");
      return errors;
    },
    ingresosErrors() {
      const errors = [];
      if (!this.$v.ingresos.$dirty) return errors;
      !this.$v.ingresos.required && errors.push("Ingresos es requerido.");
      !this.$v.ingresos.numeric &&
        errors.push("Ingresos solo acepta caracteres numericos");
      return errors;
    },
    personajeErrors() {
      const errors = [];
      if (!this.$v.personaje.$dirty) return errors;
      !this.$v.personaje.required && errors.push("Personaje es requerido.");
      return errors;
    },
    rolErrors() {
      const errors = [];
      if (!this.$v.rol.$dirty) return errors;
      !this.$v.rol.required && errors.push("Rol es requerido.");
      return errors;
    },
  },

  methods: {
    registrar() {
      this.$v.$touch();

      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .post(
          "https://movies25.herokuapp.com/api/pelicula",
          {
            tituloOriginal: this.tituloOriginal,
            tituloEspanol: this.tituloEspanol,
            fechaLanzamiento: this.date,
            genero: this.genero,
            calificacion: this.calificacion,
            sinopsis: this.sinopsis,
            director: this.director,
            escritor: this.escritor,
            repartoPrincipal: this.repartoPrincipal,
            estado: this.estado,
            idiomaOriginal: this.idiomaOriginal,
            presupuesto: this.presupuesto,
            ingresos: this.ingresos,
          },
          header
        )
        .then((response) => {
          Swal.fire({
            title: "Pelicula agregada exitosamente",
            html: `${this.tituloOriginal}`,
            type: "success",
            icon: "success",
          });
          console.log(response);
        })
        .catch((error) => {
          Swal.fire("Error", error.response.data.msg.toString(), "error");
          console.log(error);
        });
    },
    actors() {
      axios
        .get("https://movies25.herokuapp.com/api/actores")
        .then((response) => {
          console.log(response.data.actores);
          this.actores = response.data.actores;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reparto(actor) {
      this.act = actor._id;
      this.repartoPrincipal.push({
        act: actor._id,
        rol: this.rol,
        personaje: this.personaje,
      });
      console.log(this.repartoPrincipal);
    },
    editar(){
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .put(
          `https://movies25.herokuapp.com/api/pelicula/modificar/${this.$store.state.pelicula._id}`,
          {
            tituloOriginal: this.tituloOriginal,
            tituloEspanol: this.tituloEspanol,
            fechaLanzamiento: this.date,
            genero: this.genero,
            calificacion: this.calificacion,
            sinopsis: this.sinopsis,
            director: this.director,
            escritor: this.escritor,
            repartoPrincipal: this.repartoPrincipal,
            estado: this.estado,
            idiomaOriginal: this.idiomaOriginal,
            presupuesto: this.presupuesto,
            ingresos: this.ingresos,
          },
          header
        )
        .then((response) => {
          Swal.fire({
            title: "Pelicula editada exitosamente",
            html: `${this.tituloOriginal}`,
            type: "success",
            icon: "success",
          });
          console.log(response);
        })
        .catch((error) => {
          Swal.fire("Error", error.response.data.msg.toString(), "error");
          console.log(error);
        });
    }
  },
};
</script>
<style scoped>
.form {
  background: rgb(34, 51, 59);
  border-radius: 10px;
  padding: 16px;
  margin-top: 100px;
  margin-bottom: 100px;
  font-family: "calibri";
  box-shadow: 10px 12px 20px rgba(0, 0, 0, 0.847);
  font-family: "calibri";
}

#boton2 {
  background: rgb(30, 173, 78);
  color: rgb(253, 253, 253);
}

.card {
  margin-bottom: 20px;
  padding-bottom: 20px;
}

.boton {
  margin-top:110px;
  border-radius: 20px;
}

.titulo {
  color: white;
  font-size: 16px;
}

.dialogo {
  right: 0;
}
</style>