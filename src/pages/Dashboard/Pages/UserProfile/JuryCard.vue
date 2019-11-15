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
      <md-button class="md-round md-danger" @click="askDeleteJury(juryId)">Delete</md-button>
      <br />
      <!-- <md-checkbox v-model="home" >Show on home screen</md-checkbox> -->
      <!-- <h4 v-if="home">
        <b>Shown on homescreen</b>
      </h4> -->
    </md-card-content>
  </md-card>
</template>
<script>
import {DELETE} from "@/store/actions.type"

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
      shownHome: [],
      isDeleting: false
    };
  },
  methods: {
    askDeleteJury(juryId) {
      let isSure = confirm("Are you sure you want to delete this jury?")
      if (isSure) {
        // delete jury
        this.deleteJury(juryId)
      }
    },
    async deleteJury(juryId) {
      this.isDeleting = true;
      const TableName = "KM2019-Jury";
      const payload = {
        TableName,
        id: juryId
      };
      await this.$store.dispatch(DELETE, payload);
      this.isDeleting = false;
      // ?now is time to refresh
      document.location.reload() // easiest way
      // await this.fetchJurys(); // without refresh, but needs js kung-fu
    },
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
