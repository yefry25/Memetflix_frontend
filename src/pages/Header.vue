<template>
  <v-container fluid style="padding: 0;">
    <v-app-bar style="background: #141414">
      <v-app-bar-nav-icon @click="drawer = true" id="m"></v-app-bar-nav-icon>
      <div class="contiene">
        <h2 class="titulo-met">
          <router-link style="text-decoration: none; color: inherit" to="inicio"
            >Memetflix</router-link
          >
        </h2>
        <v-spacer></v-spacer>
        <h4 class="enlace">
          <router-link style="text-decoration: none; color: inherit" to="/"
            >Iniciar sesion</router-link
          >
        </h4>
        <h4 class="enlace">
          <router-link style="text-decoration: none; color: inherit" to="signin"
            >Registrate</router-link
          >
        </h4>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary color="#141414">
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="red accent-4"
          class="item"
        >
          <div class="menu-principal">
            <v-list-item to="/">
              <v-list-item-icon>
                <v-icon class="item-icon">mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="item-titulo"> login </v-list-item-title>
            </v-list-item>
            <v-list-item to="inicio">
              <v-list-item-icon>
                <v-icon class="item-icon">mdi-movie</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="item-titulo"
                >peliculas</v-list-item-title
              >
            </v-list-item>
            <v-list-item  v-if="this.$store.state.token!=''" to="perfil">
              <v-list-item-icon>
                <v-icon class="item-icon">mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="item-titulo"
                >perfil</v-list-item-title
              >
            </v-list-item>
          </div>
          <v-list-item v-if="this.$store.state.token!=''" to="formuPelicula">
            <v-list-item-icon>
              <v-icon class="item-icon">mdi-movie-roll</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="item-titulo">Registrar pelicula</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="this.$store.state.token!=''" to="formuActor">
            <v-list-item-icon>
              <v-icon class="item-icon">mdi-duck</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="item-titulo"
              >registrar Actor</v-list-item-title
            >
          </v-list-item>
          <v-list-item v-if="this.$store.state.token!=''" to="favorito">
            <v-list-item-icon>
              <v-icon class="item-icon">mdi-tag-heart</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="item-titulo">favoritos</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="this.$store.state.token!=''" to="actores">
            <v-list-item-icon>
              <v-icon class="item-icon">mdi-robot</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="item-titulo">actores</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: "pageHeader",

  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>

<style scoped>

.titulo-met {
  color: #e50941;
  font-family: "Open Sans", sans-serif;
}

.enlace {
  color: #aaa;
  text-decoration: none;
  margin-right: 20px;
}

.enlace:hover {
  color: #fff;
}

.contiene {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu {
  color: #fff;
}

.menu-principal {
  border-bottom: 1px solid #aaa;
  padding: 10px 1px;
}

.item .item-titulo {
  color: #fff;
}

.item .item-icon {
  color: #fff;
}

#m{
  color: rgb(255, 0, 0);
}
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:wght@400;600&display=swap");
</style>