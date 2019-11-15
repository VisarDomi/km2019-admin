<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item" style="margin-bottom:5rem;">
        <md-button class="md-success" @click="addJury()">Add new jury...</md-button>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-20" v-for="jury of this.jurys">
        <jury-card
          button-color="success"
          :juryId="jury.id"
          :cardUserImage="jury.img"
          :firstName="jury.firstName"
          :lastName="jury.lastName"
          :descriptionEng="jury.bioEng.substring(0,80)"
          :description="jury.bio.substring(0, 80)"
        ></jury-card>
      </div>
    </div>
  </div>
</template>

<script>
import { JuryCard } from "@/pages";
import { LIST_JURY } from "@/store/actions.type";
import { mapGetters } from "vuex";
export default {
  name: "Jurys",
  components: {
    JuryCard
  },
  data() {
    return {
      jurys: []
    };
  },
  methods: {
    goToJury(jury) {},
    addJury() {
      this.$router.push({ name: "CreateJury" });
    },
    async fetchJurys() {
      this.jurys = []
      const TableName = "KM2019-Jury";
      const Limit = "100";
      const params = {
        TableName,
        Limit
      };
      await this.$store.dispatch(LIST_JURY, params);

      for (let jury of this.getJurys) {
        this.jurys.push(jury);
      }
      this.jurys.sort((a, b) => b.ordering - a.ordering);
    }
  },
  async mounted() {
    await this.fetchJurys();
  },
  computed: {
    ...mapGetters(["getJurys"])
  }
};
</script>
<style lang="scss">
.text-right {
  display: flex;
}
</style>