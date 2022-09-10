<template>
  <v-container fluid class="contenedor">
    <v-row class="justify-center">
      <v-col cols="6">
        <form class="form">
          <v-text-field v-model="name" :error-messages="nameErrors" :counter="25" label="nombre" required
            @input="$v.name.$touch()" @blur="$v.name.$touch()" color="black" background-color="#F7E8E8" rounded>
          </v-text-field>
          <v-text-field v-model="apellido" :error-messages="apellidoErrors" :counter="15" label="apellido" required
            @input="$v.apellido.$touch()" @blur="$v.apellido.$touch()" color="black" background-color="#F7E8E8" rounded>
          </v-text-field>
          <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()"
            @blur="$v.email.$touch()" color="black" background-color="#F7E8E8" rounded></v-text-field>
          <v-text-field v-model="edad" :error-messages="edadErrors" label="edad" @input="$v.edad.$touch()"
            @blur="$v.edad.$touch()" color="black" background-color="#F7E8E8" rounded></v-text-field>
          <v-text-field v-model="alias" :error-messages="aliasErrors" label="alias" required @input="$v.alias.$touch()"
            @blur="$v.alias.$touch()" color="black" background-color="#F7E8E8" rounded></v-text-field>
          <v-text-field v-model="descripcion" :error-messages="descripcionErrors" :counter="200" label="descripcion"
            required @input="$v.descripcion.$touch()" @blur="$v.descripcion.$touch()" color="black"
            background-color="#F7E8E8" rounded></v-text-field>
          <v-text-field v-model="password" :error-messages="passwordErrors" :counter="12" label="contraseña" required
            @input="$v.password.$touch()" @blur="$v.password.$touch()" color="black" background-color="#F7E8E8" rounded>
          </v-text-field>
          <v-text-field v-model="confirmar" :error-messages="confirmarErrors" :counter="12" label="repetir contraseña"
            required @input="$v.confirmar.$touch()" @blur="$v.confirmar.$touch()" color="black"
            background-color="#F7E8E8" rounded></v-text-field>
          <v-text-field v-model="rol" :error-messages="rolErrors" label="asignar rol" required @input="$v.rol.$touch()"
            @blur="$v.rol.$touch()" color="black" background-color="#F7E8E8" rounded></v-text-field>
          <v-checkbox v-model="checkbox" :error-messages="checkboxErrors" label="Do you agree?" required
            @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()"></v-checkbox>

          <v-btn id="botones" class="mr-4" @click="registrar"> submit </v-btn>
          <v-btn id="botones" @click="clear"> clear </v-btn>
          <v-btn id="botones" @click="editar">editar</v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  alphaNum,
  alpha,
  numeric,
  minLength,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  name: "pageSignin",

  mixins: [validationMixin],

  data: () => ({
    name: "",
    apellido: "",
    email: "",
    password: "",
    confirmar: "",
    edad: "",
    alias: "",
    checkbox: false,
    rol: "",
    descripcion: "",
  }),

  validations: {
    name: { required, maxLength: maxLength(25), alpha },
    apellido: { required, maxLength: maxLength(25), alpha },
    email: { required, email, maxLength: maxLength(25) },
    password: { required, alphaNum, minLength: minLength(8) },
    confirmar: { required, sameAs: sameAs("password") },
    edad: { required, numeric },
    alias: { required, alpha },
    descripcion: { required, maxLength: maxLength(200) },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
    rol: { required },
  },

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 15 characters long");
      !this.$v.name.required && errors.push("Nombre es requerido.");
      !this.$v.name.alpha && errors.push("no se aceptan numeros");
      return errors;
    },
    apellidoErrors() {
      const errors = [];
      if (!this.$v.apellido.$dirty) return errors;
      !this.$v.apellido.maxLength &&
        errors.push("Name must be at most 15 characters long");
      !this.$v.apellido.required && errors.push("Apellido es requerido.");
      !this.$v.apellido.alpha && errors.push("no se aceptan numeros");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("solo formato e-mail");
      !this.$v.email.required && errors.push("E-mail es requerido");
      !this.$v.email.maxLength && errors.push("maximo 25 caracteres");
      return errors;
    },
    edadErrors() {
      const errors = [];
      if (!this.$v.edad.$dirty) return errors;
      !this.$v.edad.required && errors.push("edad es requerida");
      !this.$v.edad.numeric && errors.push("edad solo puede contener numeros");
      return errors;
    },
    aliasErrors() {
      const errors = [];
      if (!this.$v.alias.$dirty) return errors;
      !this.$v.alias.required && errors.push("alias es requerido");
      !this.$v.alias.alpha &&
        errors.push("edad debe contener caracteres alfabeticos");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("contraseña es requerida");
      !this.$v.password.alphaNum &&
        errors.push("la contraseña debe tener caracteres alfanumericos");
      !this.$v.password.minLength &&
        errors.push("la contraseña debe tener minimo 8 caracteres");
      return errors;
    },
    confirmarErrors() {
      const errors = [];
      if (!this.$v.confirmar.$dirty) return errors;
      !this.$v.confirmar.required &&
        errors.push("repetir contraseña es requerida");
      !this.$v.confirmar.sameAs &&
        errors.push("deben coincidir las contraseñas");
      return errors;
    },
    rolErrors() {
      const errors = [];
      if (!this.$v.rol.$dirty) return errors;
      !this.$v.rol.required && errors.push("rol es requerido");
      return errors;
    },
    descripcionErrors() {
      const errors = [];
      if (!this.$v.descripcion.$dirty) return errors;
      !this.$v.descripcion.maxLength &&
        errors.push("Name must be at most 200 characters long");
      !this.$v.descripcion.required && errors.push("descripcion es requerido.");
      return errors;
    },
  },

  methods: {
    clear() {
      this.$v.$reset();
      this.name = "";
      this.apellido = "";
      this.email = "";
      this.edad = "";
      this.alias = "";
      this.password = "";
      this.confirmar = "";
      this.checkbox = false;
      this.rol = "";
      this.descripcion = "";
    },
    registrar() {
      this.$v.$touch();
      axios
        .post("https://movies25.herokuapp.com/api/usuario", {
          email: this.email,
          password: this.password,
          nombre: this.name,
          apellido: this.apellido,
          edad: this.edad,
          alias: this.alias,
          rol: this.rol,
          descripcion: this.descripcion,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editar() {
      /* this.name = this.$store.state.datos.nombre;
      this.apellido = this.$store.state.datos.apellido;
      this.email = this.$store.state.datos.email;
      this.edad = this.$store.state.datos.edad;
      this.alias = this.$store.state.datos.alias;
      this.rol = this.$store.state.datos.rol;
      this.descripcion = this.$store.state.datos.descripcion; */

      let header = { headers: { "x-token": this.$store.state.token } };

      axios
        .put(
          `https://movies25.herokuapp.com/api/usuario/${this.$store.state.datos._id}`,
          {
            email: this.email,
            password: this.password,
            nombre: this.name,
            apellido: this.apellido,
            edad: this.edad,
            alias: this.alias,
            rol: this.rol,
            descripcion: this.descripcion,
          },
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
  background: linear-gradient(rgba(167, 160, 160, 0.9) 0%,
      rgba(167, 160, 160, 0.9) 100%);
  border-radius: 10px;
  padding: 16px;
  margin-top: 100px;
  margin-bottom: 100px;
  font-family: "calibri";
  box-shadow: 10px 12px 20px rgba(0, 0, 0, 0.847);
}

#botones {
  border-radius: 8px;
  color: rgb(255, 255, 255);
  background-color: rgb(236, 10, 10);
}

.contenedor {
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.6) 100%),
    url(https://www.islabit.com/wp-content/uploads/2020/12/cintas-online.jpg);
  background-position: center center;
  background-size: cover;
}
</style>