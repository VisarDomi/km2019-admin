<template>
  <div>
    <button @click="fetchVotes()">Get Votes</button>
    <p v-for="artist in artists">{{artist.name}} : {{artist.votes}}</p>
  </div>
</template>

<script>
import { LIST_VOTE, GET_ARTIST } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
  name: "Votes",

  data() {
    return {
      artists: []
    };
  },
  components: {},
  methods: {
    async fetchVotes() {
      const TableName = "KM2019-Vote";
      const Limit = "1000000000";
      const params = {
        TableName,
        Limit
      };
      await this.$store.dispatch(LIST_VOTE, params);
      console.log(this.getVotes);

      let list_votes = [];
      let list_ids = [];
      for (let vote of this.getVotes) {
        list_votes.push(vote.votes);
        list_ids.push(vote.artistId);
      }
      this.fetchArtistNames(list_votes, list_ids);
    },
    async fetchArtistNames(votes, ids) {
      let i = 0;
      for (let singleId of ids) {
        const TableName = "KM2019-Artist";
        const id = singleId;
        const params = {
          TableName,
          id
        };
        await this.$store.dispatch(GET_ARTIST, params);
        this.artists.push({ name: this.getArtist.name, votes: votes[i] });
        i = i + 1;
      }
    }
  },
  computed: {
    ...mapGetters(["getVotes", "getArtist"])
  }
};
</script>
