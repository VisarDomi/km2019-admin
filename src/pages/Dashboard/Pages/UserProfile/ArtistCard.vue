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
      <md-button class="md-round md-danger" @click="askDeleteArtist(artistId)">Delete</md-button>
      <br />
      <!-- <md-checkbox v-model="home" >Show on home screen</md-checkbox> -->
      <h4 v-if="home"><b> Shown on homescreen</b></h4>
      <h4>Order - {{ordering}}</h4>
    </md-card-content>
  </md-card>
</template>
<script>
import {DELETE} from "@/store/actions.type"

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
    ordering: "",
    home: "",
    week: "",
    video: "",
    artistId: ""
  },
  data() {
    return {
      shownHome: [],
      isDeleting: false
    };
  },
  methods: {
    askDeleteArtist(artistId) {
      let isSure = confirm("Are you sure you want to delete this artist?")
      if (isSure) {
        // delete artist
        this.deleteArtist(artistId)
      }
    },
    async deleteArtist(artistId) {
      this.isDeleting = true;
      const TableName = "KM2019-Artist";
      const payload = {
        TableName,
        id: artistId
      };
      await this.$store.dispatch(DELETE, payload);
      this.isDeleting = false;
      // ?now is time to refresh
      document.location.reload() // easiest way
      // await this.fetchArtists(); // without refresh, but needs js kung-fu
    },
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
