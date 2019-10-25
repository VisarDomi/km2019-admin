<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">Jury</h6>
      <h4 class="card-title">{{firstName + " " + lastName}}</h4>
      <p class="card-description">{{description}}</p>
      <br />
      <p class="card-description">{{descriptionEng}}</p>
      <md-button
        class="md-round"
        :class="getColorButton(buttonColor)"
        @click="editJury(juryId)"
      >Edit</md-button>
      <md-button class="md-round md-danger">Delete</md-button>
      <br />
      <!-- <md-checkbox v-model="home" >Show on home screen</md-checkbox> -->
      <!-- <h4 v-if="home">
        <b>Shown on homescreen</b>
      </h4> -->
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "jury-card",
  props: {
    cardUserImage: {
      type: String,
      default: "./img/faces/marc.jpg"
    },
    buttonColor: {
      type: String,
      default: ""
    },
    firstName: "",
    lastName: "",
    description: "",
    descriptionEng: "",
    juryId: ""
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
    async editJury(juryId) {
      this.$router.push({ name: "EditJury", params: { id: juryId } });
    }
  }
};
</script>
<style></style>
