<template>
  <div>
    <div v-for="artist of this.getArtists">
      <button @click="fetchVotes(artist.id)">Get Votes of {{artist.name}}</button>
    </div>
    <br />
    <div>Votes are {{votes}}</div>
    <br />
  </div>
</template>

<script>
import { LIST_VOTE, GET_ARTIST, LIST_ARTIST } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
  name: "Votes",

  data() {
    return {
      artists: [],
      votes: 0
    };
  },
  components: {},
  methods: {
    async fetchVotes(artistId) {
      console.log("artistId", artistId);
      const TableName = "KM2019-Vote";
      const params = {
        TableName,
        artistId
      };
      await this.$store.dispatch(LIST_VOTE, params);

      this.votes = this.getVotes.votes;

      // let list_votes = [];
      // let list_ids = [];
      // for (let vote of this.getVotes) {
      //   list_votes.push(vote.votes);
      //   list_ids.push(vote.artistId);
      // }
      // this.fetchArtistNames(list_votes, list_ids);
    }
    // async fetchArtistNames(votes, ids) {
    //   let i = 0;
    //   for (let singleId of ids) {
    //     const TableName = "KM2019-Artist";
    //     const id = singleId;
    //     const params = {
    //       TableName,
    //       id
    //     };
    //     await this.$store.dispatch(GET_ARTIST, params);
    //     this.artists.push({ name: this.getArtist.name, votes: votes[i] });
    //     i = i + 1;
    //   }
    // }
  },
  computed: {
    ...mapGetters(["getVotes", "getArtist", "getArtists"])
  },
  async mounted() {
    const TableName = "KM2019-Artist";
    const params = {
      TableName,
      Limit: 100
    };
    await this.$store.dispatch(LIST_ARTIST, params);
  }
};
</script>
