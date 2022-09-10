<template>
  <v-container fluid style="height: 100%; background: #dececb">
    <v-row class="justify-center">
      <v-col cols="6">
        <form class="form">
          <v-text-field
            v-model="nombre"
            :error-messages="nombreErrors"
            label="Nombre"
            required
            @input="$v.nombre.$touch()"
            @blur="$v.nombre.$touch()"
            color="white"
            background-color="#d7dbdd"
            flat
            rounded
          ></v-text-field>
          <v-text-field
            v-model="biografia"
            :error-messages="biografiaErrors"
            label="Biografia"
            required
            @input="$v.biografia.$touch()"
            @blur="$v.biografia.$touch()"
            color="white"
            background-color="#d7dbdd"
            flat
            rounded
          ></v-text-field>
          <v-btn class="boton" @click="agregar">Agregar</v-btn>
          <v-btn class="boton" @click="editar">Editar</v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "pageFormuActor",

  mixins: [validationMixin],

  data: () => ({
    nombre: "",
    biografia: "",
  }),

  validations: {
    nombre: { required },
    biografia: { required, minLength: minLength(8) },
  },

  computed: {
    nombreErrors() {
      const errors = [];
      if (!this.$v.nombre.$dirty) return errors;
      !this.$v.nombre.required && errors.push("Nombre es requerido.");
      return errors;
    },
    biografiaErrors() {
      const errors = [];
      if (!this.$v.biografia.$dirty) return errors;
      !this.$v.biografia.minLength && errors.push("Minimo 8 caracteres.");
      !this.$v.biografia.required && errors.push("Biografia es requerida.");
      return errors;
    },
  },
  methods: {
    agregar() {
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(header);
      axios
        .post(
          "https://movies25.herokuapp.com/api/actores",
          { nombre: this.nombre, biografia: this.biografia },
          header
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editar() {
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(this.$store.state.actor._id);
      axios
        .put(
          `https://movies25.herokuapp.com/api/actores/${this.$store.state.actor._id}`,
          { nombre: this.nombre, biografia: this.biografia },
          header
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
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

.boton {
  margin-left: 10px;
  border-radius: 20px;
  background: green;
  color: rgb(116, 26, 26);
}
</style>