<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item" style="margin-bottom:5rem;">
        <md-button class="md-success" @click="downloadPDF()">Create PDF of voting table</md-button>
      </div>
    </div>
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
            <div id="sss">

            
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
            </div>
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

import jsPDF from 'jspdf';
import 'jspdf-autotable';





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
        perPageOptions: [5, 10, 25, 50, 75],
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
    downloadPDF(){
      //first add id to table so autotable can work
      var voteTab = document.getElementsByTagName("table")[0];
      voteTab.setAttribute("id", "votingTable");

      //initialize jspdf
      var doc = new jsPDF();
      console.log("starting pdf generation function. doc initialized: ",doc)

      //generate pdf
      doc.autoTable({html: '#votingTable'});
      doc.save('voting-table.pdf');
    },
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          // return a[sortBy].localeCompare(b[sortBy]);
          console.log("->", a[sortBy] > b[sortBy]);
          console.log("a->", a[sortBy]);
          console.log("b->", b[sortBy]);
          if (a[sortBy] > b[sortBy]) {
            return -1;
          } else if (a[sortBy] < b[sortBy]) {
            return 1;
          } else {
            return 0;
          }
        }

        if (a[sortBy] > b[sortBy]) {
          return 1;
        } else if (a[sortBy] < b[sortBy]) {
          return -1;
        } else {
          return 0;
        }
      });
    }
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
