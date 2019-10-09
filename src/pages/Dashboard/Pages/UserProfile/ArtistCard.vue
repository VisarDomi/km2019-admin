<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">Artist - Week {{week}}</h6>
      <h4 class="card-title">{{name}}</h4>
      <p class="card-description">{{description}}</p>
      <br>
      <p class="card-description">{{descriptionEng}}</p>
      <p class="card-video">
        <a :href="video">{{video}}</a>
      </p>
      <md-button class="md-round" :class="getColorButton(buttonColor)" @click="editArtist(artistId)">Edit</md-button>
      <md-button class="md-round md-danger">Delete</md-button>
      <br />
      <md-checkbox v-model="home" >Show on home screen</md-checkbox>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "artist-card",
  props: {
    cardUserImage: {
      type: String,
      default: "./img/faces/marc.jpg"
    },
    buttonColor: {
      type: String,
      default: ""
    },
    name: "",
    description: "",
    descriptionEng: "",
    home: "",
    week: "",
    video: "",
    artistId: ""
  },
  data() {
    return {
      shownHome: []
    };
  },
  methods: {
    getColorButton: function(buttonColor) {
      return "md-" + buttonColor + "";
    },
    async editArtist(artistId) {

      this.$router.push({
        name: "EditArtist",
        params: {  id: artistId}
      });
    }
  }
};
</script>
<style></style>
