import carousel from "../components/Carousel.vue"
import signin from "../components/Signin.vue"
import pelicula from "../components/Pelicula.vue"
import contenido from "../components/Contenido.vue"
import login from "../components/Login.vue"
import prueba from "../components/Prueba.vue"
import favorito from "../components/Favoritos.vue"
import actor from "../components/Actores.vue"
import formuActor from "../components/FormuActor.vue"
import formuPelicula from "../components/FormuPelicula.vue"
import perfil from "../components/Perfil.vue"
import infoActor from "../components/InfoActor.vue"

export const routes = [
    {path:"/inicio",component:carousel},
    {path:"/signin", component:signin},
    {path:"/pelicula", component:pelicula},
    {path:"/contenido", component:contenido},
    {path:"/", component:login},
    {path:"/prueba", component:prueba},
    {path:"/favorito",component:favorito},
    {path:"/actores",component:actor},
    {path:"/formuActor",component:formuActor},
    {path:"/formuPelicula",component:formuPelicula},
    {path:"/perfil",component:perfil},
    {path:"/infoActor",component:infoActor},
]
