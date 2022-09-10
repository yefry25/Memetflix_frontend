<template>
  <v-container-fluid>
    <v-row>
      <v-col>
        <div id="example">
          <carousel-3d
            :disable3d="true"
            :space="365"
            :clickable="false"
            :controls-visible="true"
          >
            <slide v-for="(slide, i) in slides" :key="i">
              <span class="title">You know</span>
              <p>
                You know, being a test pilot isn't always the healthiest
                business in the world.
              </p>
            </slide>
          </carousel-3d>
        </div>
      </v-col>
    </v-row>
  </v-container-fluid>
</template>

<script>
export default {
  name: "pageContenido",
  data: () => ({
    slides: 7,
  }),
};
</script>