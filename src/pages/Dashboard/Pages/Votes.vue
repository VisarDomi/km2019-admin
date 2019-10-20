<template>
  <div>
    <!-- <div v-for="artist of this.getArtists">
      <button @click="fetchVotes(artist.id)">Get Votes of {{artist.name}}</button>
    </div>
    <br />
    <div>Votes are {{votes}}</div>
    <br />-->

    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>assignment</md-icon>
            </div>
            <h4 class="title">Artist votes</h4>
          </md-card-header>
          <md-card-content>
            <md-table
              :value="queriedData"
              :md-sort.sync="currentSort"
              :md-sort-order.sync="currentSortOrder"
              :md-sort-fn="customSort"
              class="paginated-table table-striped table-hover"
            >
              <md-table-toolbar>
                <md-field>
                  <label for="pages">Per page</label>
                  <md-select v-model="pagination.perPage" name="pages">
                    <md-option
                      v-for="item in pagination.perPageOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    >{{ item }}</md-option>
                  </md-select>
                </md-field>

                <md-field>
                  <md-input
                    type="search"
                    class="mb-3"
                    clearable
                    style="width: 200px"
                    placeholder="Search records"
                    v-model="searchQuery"
                  ></md-input>
                </md-field>
              </md-table-toolbar>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name" md-sort-by="name">
                  {{
                  item.name
                  }}
                </md-table-cell>
                <md-table-cell md-label="Video">
                  {{
                  item.video
                  }}
                </md-table-cell>
                <md-table-cell md-label="Week" md-sort-by="week">{{ item.week }}</md-table-cell>
                <md-table-cell md-label="Votes" md-sort-by="votes">{{ item.votes }}</md-table-cell>
              </md-table-row>
            </md-table>
            <div class="footer-table md-table">
              <table>
                <tfoot>
                  <tr>
                    <th v-for="item in footerTable" :key="item.name" class="md-table-head">
                      <div class="md-table-head-container md-ripple md-disabled">
                        <div class="md-table-head-label">{{ item }}</div>
                      </div>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </md-card-content>
          <md-card-actions md-alignment="space-between">
            <div class>
              <p class="card-category">Showing {{ from + 1 }} to {{ to }} of {{ total }} entries</p>
            </div>
            <pagination
              class="pagination-no-border pagination-success"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="total"
            ></pagination>
          </md-card-actions>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { LIST_VOTE, GET_ARTIST, LIST_ARTIST } from "@/store/actions.type";
import { mapGetters } from "vuex";

import Fuse from "fuse.js";
import swal from "sweetalert2";
import { Pagination } from "@/components";
export default {
  components: {
    Pagination
  },
  name: "Votes",

  data() {
    return {
      artists: [],
      votes: 0,

      currentSort: "week",
      currentSortOrder: "asc",
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      footerTable: ["Name", "Video", "Week", "Votes"],
      searchQuery: "",
      propsToSearch: ["name"],
      tableData: [],
      searchedData: [{}],
      fuseSearch: null
    };
  },
  methods: {
    customSort(value) {
      return value.sort((a, b) => {

        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          // return a[sortBy].localeCompare(b[sortBy]);
          console.log("->",a[sortBy] > b[sortBy])
          console.log("a->",a[sortBy] )
          console.log("b->",b[sortBy])
          if(a[sortBy] > b[sortBy]){
            return -1;
          } else if (a[sortBy] < b[sortBy]){
            return 1;
          } else {
            return 0;
          }

          
        }


        if(a[sortBy] > b[sortBy]){
            return 1;
          } else if (a[sortBy] < b[sortBy]){
            return -1;
          } else {
            return 0;
          }

      });
    }
    // async fetchVotes(artistId) {
    //   console.log("artistId", artistId);
    //   const TableName = "KM2019-Vote";
    //   const params = {
    //     TableName,
    //     artistId
    //   };
    //   await this.$store.dispatch(LIST_VOTE, params);

    //   this.votes = this.getVotes.votes;
    //   console.log("this.votes: ", this.votes)

    //   let list_votes = [];
    //   let list_ids = [];
    //   for (let vote of this.getVotes) {
    //     console.log("vote in for loop: ", vote)
    //     list_votes.push(vote.votes);
    //     list_ids.push(vote.artistId);
    //   }
    //   this.fetchArtistNames(list_votes, list_ids);
    // },
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
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.getArtists;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    },
    ...mapGetters(["getVotes", "getArtist", "getArtists"])
  },
  async mounted() {
    console.log("mounted table data: ", this.tableData);

    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["name", "week", "votes"],
      threshold: 0.3
    });

    const TableName = "KM2019-Artist";
    const params = {
      TableName,
      Limit: 100,
      Votes: "yes"
    };
    await this.$store.dispatch(LIST_ARTIST, params);
    this.tableData = this.getArtists;
    this.searchedData = this.getArtists;

    console.log("after mounted table data: ", this.tableData);
  },

  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    }
  }
};
</script>
