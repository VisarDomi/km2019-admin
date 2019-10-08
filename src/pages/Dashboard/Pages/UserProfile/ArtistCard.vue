<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">Artist</h6>
      <h4 class="card-title">{{name}}</h4>
      <p class="card-description">{{description}}</p>
      <p class="card-video">
        <a :href="video">{{video}}</a>
      </p>
      <md-button class="md-round" :class="getColorButton(buttonColor)" @click="editArtist(artistId)">Edit</md-button>
      <md-button class="md-round md-danger">Delete</md-button>
      <br />
      <md-checkbox v-model="shownHome" value="1">Show on home screen</md-checkbox>
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
      console.log("now should route to edit artist")
      console.log("artistId", artistId)
    }
  }
};
</script>
<style></style>
