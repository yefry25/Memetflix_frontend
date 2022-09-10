<template>
  <v-container fluid style="height: 100%; padding:0;">
    <div class="perfil-usuario">
      <div class="perfil-usuario-header">
        <div class="perfil-usuario-portada">
          <div class="perfil-usuario-avatar">
            <img :src="this.usuario.foto" alt="img-avatar" />

            <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
              hide-input
              v-model="foto"
              @change="subir()"
              class="boton-avatar"
            ></v-file-input>

          </div>
          <v-btn type="file" class="boton-portada" @click="editar">
            <v-icon>mdi-image</v-icon> Editar perfil
          </v-btn>
        </div>
      </div>
      <!-- info usuario -->
      <div class="perfil-usuario-body">
        <div class="perfil-usuario-bio">
          <h3 class="titulo">
            {{ this.usuario.nombre }} {{ this.usuario.apellido }}
          </h3>
          <p class="texto">
            {{this.usuario.descripcion}}
          </p>
        </div>
        <!-- footer -->
        <div class="perfil-usuario-footer">
          <ul class="lista-datos">
            <li>
              <i class="icono icon-image"></i>edad: {{ this.usuario.edad }}
            </li>
            <li>
              <i class="icono icon-image"></i>alias: {{ this.usuario.alias }}
            </li>
            <li><i class="icono icon-image"></i>Rol: {{ this.usuario.rol }}</li>
            <li>
              <i class="icono icon-image"></i>email: {{ this.usuario.email }}
            </li>
          </ul>
        </div>
        <div class="redes-sociales">
          <a href="" class="boton-redes facebook"
            ><v-icon>mdi-facebook</v-icon></a
          >
          <a href="" class="boton-redes instagram"
            ><v-icon>mdi-instagram</v-icon></a
          >
          <a href="" class="boton-redes twitter"
            ><v-icon>mdi-twitter</v-icon></a
          >
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "pagePerfil",
  data: () => ({
    usuario: [],
    foto:[],
  }),
  methods: {
    traerUsuario() {
      this.usuario = this.$store.state.datos;
      console.log(this.$store.state.datos);
      /* console.log(this.usuario); */
    },

    subir() {
      console.log(this.foto);
      let fd = new FormData();
      fd.append("archivo", this.foto);
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(this.$store.state.datos._id);
      console.log(fd);
      axios
        .post(
          `https://movies25.herokuapp.com/api/usuario/uploadinary/${this.$store.state.datos._id}`,
          fd,
          header
        )
        .then((response) => {
          console.log(response.data);
          this.$store.state.datos.foto = response.data.url; /* hacer esto con un state y un commit */
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editar() {
      this.$router.push("/signin");
    }
  },
  created() {
    this.traerUsuario();
  },
};
</script>

<style scoped>
.perfil-usuario .perfil-usuario-body,
.perfil-usuario {
  display: flex;
  flex: wrap;
  flex-direction: column;
  align-items: center;
}

.perfil-usuario .perfil-usuario-header {
  width: 100%;
  display: flex;
  justify-content: center;
  background: linear-gradient(#b873ff, transparent);
  margin-bottom: 1.25rem;
}

.perfil-usuario .perfil-usuario-portada {
  display: block;
  position: relative;
  width: 90%;
  height: 17rem;
  background: linear-gradient(45deg, #bc3cff, #317fff);
  border-radius: 0 0 20px 20px;
}

.perfil-usuario .perfil-usuario-portada .boton-portada {
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: 0;
  border-radius: 8px;
  padding: 12px 25px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  cursor: pointer;
}

.perfil-usuario .perfil-usuario-avatar {
  display: flex;
  width: 180px;
  height: 180px;
  align-items: center;
  justify-content: center;
  border: 7px solid #ffffff;
  background-color: #dfe5f2;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: -40px;
  left: calc(50% - 90px);
  z-index: 1;
  /* overflow: hidden; */
}

.perfil-usuario .perfil-usuario-avatar img {
  width: 100%;
  position: relative;
  border-radius: 50%;
}

.perfil-usuario .perfil-usuario-avatar .boton-avatar {
  position: absolute;
  left: -2px;
  top: -2px;
  border: 0;
  background-color: #fff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
}

.perfil-usuario .perfil-usuario-body {
  width: 70%;
  position: relative;
  max-width: 750px;
}

.perfil-usuario .perfil-usuario-body .titulo {
  display: block;
  width: 100%;
  font-size: 1.75em;
  margin-bottom: 0.5rem;
}

.perfil-usuario .perfil-usuario-body .texto {
  color: #848484;
  font-size: 0.95em;
}

.perfil-usuario .perfil-usuario-footer,
.perfil-usuario .perfil-usuario-bio {
  display: flex;
  flex-wrap: wrap;
  padding: 1.5rem 2rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 15px;
  width: 100%;
}

.perfil-usuario .perfil-usuario-bio {
  margin-bottom: 1.25rem;
  text-align: center;
}

.perfil-usuario .perfil-usuario-footer {
  padding: 0;
}

.perfil-usuario .lista-datos {
  width: 50%;
  list-style: none;
}

.perfil-usuario .lista-datos li {
  padding: 5px 0;
}

.perfil-usuario .lista-datos li > icono {
  margin-right: 1rem;
  font-size: 1.2rem;
  vertical-align: middle;
}

.perfil-usuario .redes-sociales {
  position: absolute;
  right: calc(0px - 50px - 1rem);
  top: 0;
}

.perfil-usuario .redes-sociales .boton-redes {
  border: 0;
  background-color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.perfil-usuario .redes-sociales .boton-redes + .boton-redes {
  margin-top: 0.5rem;
}
.perfil-usuario .boton-redes.facebook {
  background-color: #5955ff;
}
.perfil-usuario .boton-redes.instagram {
  background: linear-gradient(45deg, #ff2dfd, #40a7ff);
}
.perfil-usuario .boton-redes.twitter {
  background-color: #35e1bf;
}

@media (max-width: 750px) {
  .perfil-usuario .lista-datos {
    width: 100%;
    list-style: none;
  }

  .perfil-usuario .perfil-usuario-portada,
  .perfil-usuario .perfil-usuario-body {
    width: 95%;
  }

  .perfil-usuario .redes-sociales {
    position: relative;
    flex-direction: row;
    width: 100%;
    left: 0;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .perfil-usuario .redes-sociales .boton-redes + .boton-redes {
    margin-left: 1rem;
  }

  .perfil-usuario .redes-sociales .boton-redes {
    display: inline-flex;
  }
}
</style>
