<template>
  <v-container
    fluid
    style="
      height: 100%;
      background-image: linear-gradient(rgba(0,0,0, .60) 0%, rgba(0,0,0, .60) 100%), url(https://www.islabit.com/wp-content/uploads/2020/12/cintas-online.jpg);
      background-position: center center;
      background-size: cover;
    "
  >
    <v-row class="justify-center">
      <v-col cols="6">
        <form class="form">
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            type="email"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            color="white"
            background-color="#333333"
            rounded
          ></v-text-field>
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            :counter="8"
            type="password"
            label="contraseña"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            @keyup.enter="submit"
            color="white"
            background-color="#333333"
            rounded
          ></v-text-field>
          <v-btn id="botones" class="mr-4 mb-4 ml-4" @click="submit">
            submit
          </v-btn>
          <v-btn id="botones" class="mb-4" @click="clear"> clear </v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  alphaNum,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "pageSignin",

  mixins: [validationMixin],

  data: () => ({
    email: "",
    password: "",
  }),

  validations: {
    email: { required, email, maxLength: maxLength(25) },
    password: { required, alphaNum, minLength: minLength(8) },
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      !this.$v.email.maxLength && errors.push("maximo 25 caracteres");

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
  },

  methods: {
    submit() {
      this.$v.$touch();
      axios
        .post("https://movies25.herokuapp.com/api/usuario/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          Swal.fire("Correcto", "success");
          this.$router.push("/inicio");
          this.$store.dispatch("setToken", response.data.token);
          this.$store.dispatch("setDatos", response.data.usuario);
          console.log(response.data.usuario);
        })
        .catch((error) => {
          Swal.fire("Error", error.toString(), "error");
          console.log(error);
        });
    },
    clear() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped >
.form {
  background: linear-gradient(rgba(0,0,0, .80) 0%, rgba(0,0,0, .80) 100%);
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
</style>