<template>
  <div class="content">

        <div class="md-layout">
      <div class="md-layout-item" style="margin-bottom:5rem;">
        <md-button class="md-success" @click="addArtist()">Add new artist...</md-button>
      </div>
    </div>


    <div class="md-layout">

      <div class="md-layout-item md-medium-size-100 md-size-20">
        <artist-card button-color="success" cardUserImage="./flori.jpg" name="Flori Mumajesi" description="Turbo Folk"> </artist-card>
      </div>

      <div class="md-layout-item md-medium-size-100 md-size-20">
        <artist-card button-color="success" cardUserImage="./flori.jpg" name="Flori Mumajesi" description="Turbo Folk"> </artist-card>
      </div>

      <div class="md-layout-item md-medium-size-100 md-size-20">
        <artist-card button-color="success" cardUserImage="./flori.jpg" name="Flori Mumajesi" description="Turbo Folk"> </artist-card>
      </div>

      <div class="md-layout-item md-medium-size-100 md-size-20">
        <artist-card button-color="success" cardUserImage="./flori.jpg" name="Flori Mumajesi" description="Turbo Folk"> </artist-card>
      </div>

      <div class="md-layout-item md-medium-size-100 md-size-20">
        <artist-card button-color="success" cardUserImage="./flori.jpg" name="Flori Mumajesi" description="Turbo Folk"> </artist-card>
      </div>
    </div>
  </div>
</template>

<script>

import { ArtistCard } from "@/pages";
export default {
  name: "Artists",
  components: {
    ArtistCard
  },
  data() {
    return {

    };
  },
  methods:{
    addArtist(){
      this.$router.push({ name: "CreateArtist" });
    }
  }
};
</script>
<style lang="scss">
.text-right {
  display: flex;
}
</style>