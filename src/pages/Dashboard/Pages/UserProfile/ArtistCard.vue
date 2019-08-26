<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">Artist</h6>
      <h4 class="card-title">{{name}}</h4>
      <p class="card-description">
        {{description}}
      </p>
      <md-button class="md-round" :class="getColorButton(buttonColor)"
        >View</md-button
      >
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
    description: ""
  },
  data() {
    return {};
  },
  methods: {
    getColorButton: function(buttonColor) {
      return "md-" + buttonColor + "";
    }
  }
};
</script>
<style></style>
