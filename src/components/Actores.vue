<template>
  <v-container fluid style="height: 100%; background: #f1dddd">
    <v-row>
      <v-col v-for="(act, i) in actor" :key="i" class="my-10">
        <v-hover v-slot="{ hover }">
          <v-card
            class="card"
            max-width="200px"
            max-height="300px"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
          >
            <v-img :src="act.foto" alt="actor" class="foto">
              <v-card-title class="text-h6 white--text">
                <v-row class="fill-height flex-column">
                  <p>{{ act.nombre }}</p>
                  <div class="boton">
                    <v-file-input
                      v-if="hover"
                      :rules="rules"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-camera"
                      label="Avatar"
                      hide-input
                      v-model="foto"
                      @change="subir()"
                      class="boton-avatar"
                      @click="infoActor(act)"
                    ></v-file-input>
                    <v-btn
                      v-if="hover"
                      fab
                      small
                      color="white"
                      @click="enviar(act)"
                    >
                      <v-icon dark> mdi-pencil </v-icon>
                    </v-btn>
                    <v-btn
                      v-if="hover"
                      fab
                      small
                      color="white"
                      @click="eliminar(act)"
                    >
                      <v-icon dark>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-row>
              </v-card-title>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "pageActores",
  data: () => ({
    actor: [],
    show: false,
    foto: "",
  }),

  methods: {
    traerActores() {
      axios
        .get("https://movies25.herokuapp.com/api/actores")
        .then((response) => {
          this.actor = response.data.actores;
          console.log(this.actor);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    infoActor(act) {
      /* this.$router.push("/infoActor"); */
      this.$store.dispatch("setActor", act);
    },
    subir() {
      /* this.foto=e.target.files */
      console.log(this.foto);
      let fd = new FormData();
      fd.append("archivo", this.foto);
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(this.$store.state.actor._id);
      console.log(fd);
      axios
        .post(
          `https://movies25.herokuapp.com/api/actores/uploadinary/${this.$store.state.actor._id}`,
          fd,
          header
        )
        .then((response) => {
          console.log(response.data);
          this.$store.state.actor.foto =
            response.data.url; /* hacer esto con un state y un commit */
        })
        .catch((error) => {
          console.log(error);
        });
    },
    enviar(actor) {
      this.$router.push("/formuActor");
      this.$store.dispatch("setActor", actor);
    },
    eliminar(actor) {
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(header);
      console.log(actor._id);
      axios
        .post(
          `https://movies25.herokuapp.com/api/actores/delete/${actor._id}`,header)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.traerActores();
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}

.foto {
  position: center center;
}

.boton-editar {
  border-radius: 20px;
}
</style>

