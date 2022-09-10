<template>
  <v-container fluid>
    <v-footer padless color="#141414" app>
      <v-col class="text-center" cols="12" style="color:#E50941">
        {{ new Date().getFullYear() }} — <strong >Memetflix</strong>
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
export default {
    name:"pageFooter",

    data: () => ({
        
    })
}
</script>