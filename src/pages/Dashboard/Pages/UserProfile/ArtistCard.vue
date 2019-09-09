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
      <p class="card-description">
       <a href="https://www.youtube.com/watch?v=i8Zi1DM7iR4">https://www.youtube.com/watch?v=i8Zi1DM7iR4</a> 
      </p>
      <md-button class="md-round" :class="getColorButton(buttonColor)"
        >View</md-button
      >
      <md-button class="md-round md-danger"
        >Delete</md-button
      >
      <br>
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
    description: ""
  },
  data() {
    return {
      shownHome: [],
    };
  },
  methods: {
    getColorButton: function(buttonColor) {
      return "md-" + buttonColor + "";
    }
  }
};
</script>
<style></style>
