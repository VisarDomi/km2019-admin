<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item" style="margin-bottom:5rem;">
        <md-button class="md-success" @click="addArtist()">Add new artist...</md-button>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-20" v-for="artist of this.artists">
        <artist-card
          button-color="success"
          :artistId="artist.id"
          :video="artist.video"
          :cardUserImage="artist.img"
          :name="artist.name"
          :home="artist.isCurrentWeek"
          :week="artist.week"
          :descriptionEng="artist.bioEng.substring(0,80)"
          :description="artist.bio.substring(0, 80)"
          :ordering="artist.ordering"
        ></artist-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ArtistCard } from "@/pages";
import { LIST_ARTIST } from "@/store/actions.type";
import { mapGetters } from "vuex";
export default {
  name: "Artists",
  components: {
    ArtistCard
  },
  data() {
    return {
      artists: []
    };
  },
  methods: {
    goToArtist(artist) {},
    addArtist() {
      this.$router.push({ name: "CreateArtist" });
    },
    async fetchArtists() {
      this.artists = []
      const TableName = "KM2019-Artist";
      const Limit = "100";
      const params = {
        TableName,
        Limit
      };
      await this.$store.dispatch(LIST_ARTIST, params);

      for (let artist of this.getArtists) {
        this.artists.push(artist);
      }
      this.artists.sort((a, b) => b.ordering - a.ordering);
    }
  },
  async mounted() {
    await this.fetchArtists();
  },
  computed: {
    ...mapGetters(["getArtists"])
  }
};
</script>
<style lang="scss">
.text-right {
  display: flex;
}
</style>