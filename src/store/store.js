import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        token:"",  /* token que se crea cuando inicia sesion un usuario */
        datos:{},  /* datos del usuario */
        pelicula:{}, /* detalle de las peliculas cuando son clickeadas */
        movie:[],  /* todas las peliculas de la base de datos */
        favorito:{}, 
        actor:{}, /* detalle del actor cuando es clickeado */
    },
    mutations: {
        setToken(state,value) {
            state.token=value
        },
        setDatos(state,value) {
            state.datos=value
        },
        setPelicula(state,value) {
            state.pelicula=value
        },
        setMovie(state,value){
            state.movie=value
        },
        setFavorito(state,value){
            state.favorito=value
        },
        setActor(state,value){
            state.actor=value
        },
    },
    actions:{
        setToken(context,value) {
            context.commit("setToken",value)
        },
        setDatos(context,value){
            context.commit("setDatos",value)
        },
        setPelicula(context,value){
            context.commit("setPelicula",value)
        },
        setMovie(context,value){
            context.commit("setMovie",value)
        },
        setFavorito(context,value){
            context.commit("setFavorito",value)
        },
        setActor(context,value){
            context.commit("setActor",value)
        },
    }  
})