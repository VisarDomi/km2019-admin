<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100 md-layout">
      <!-- The Sign-in button. This will run `queryReports()` on success. -->
      <p class="g-signin2" id="g-signin2" data-onsuccess="queryReports"></p>
    </div>
    <div class="md-layout-item md-size-50">
      <chart-card
        v-if="loaded"
        header-animation="false"
        :chart-data="pieChart.data"
        :chart-options="pieChart.options"
        chart-type="Pie"
        header-icon
        chart-inside-content
        background-color="green"
      >
        <template slot="chartInsideHeader">
          <div class="card-icon">
            <md-icon>pie_chart</md-icon>
          </div>
          <h4 class="title">Pie Chart</h4>
        </template>
        <template slot="footer">
          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <h6 class="category">Legend</h6>
            </div>
            <div class="md-layout-item">
              <i class="fa fa-circle text-info"></i> Tablet
              <i class="fa fa-circle text-warning"></i> Desktop
              <i class="fa fa-circle text-danger"></i> Mobile
            </div>
          </div>
        </template>
      </chart-card>
    </div>

    <div class="md-layout md-layout-item md-size-50">
      <div class="md-layout-item md-size-50">
        <stats-card header-color="rose" v-if="loaded">
          <template slot="header">
            <div class="card-icon">
              <md-icon>equalizer</md-icon>
            </div>
            <p class="category">Website Visits</p>
            <h3 class="title">
              <animated-number :value="websiteVisits"></animated-number>
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>local_offer</md-icon>Tracked from Google Analytics
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-size-50">
        <stats-card header-color="blue">
          <template slot="header">
            <div class="card-icon">
              <md-icon>list_alt</md-icon>
            </div>
            <p class="category">Votes</p>
            <h3 class="title">
              <animated-number :value="getTotalVotes"></animated-number>
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>Last
              <animated-number :value="24"></animated-number>Hours
            </div>
          </template>
        </stats-card>
      </div>

      <div class="md-layout-item md-size-100">
        <global-sales-card header-color="green">
          <template slot="header">
            <div class="card-icon">
              <md-icon>language</md-icon>
            </div>
            <h4 class="title">Website views by locations</h4>
          </template>

          <template slot="content">
            <div class="md-layout">
              <div class="md-layout-item md-size-100">
                <global-sales-table :countryData="this.countryData" v-if="loaded"></global-sales-table>
              </div>
            </div>
          </template>
        </global-sales-card>
      </div>

      <!-- <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <chart-card
          header-animation="false"
          :chart-data="emailsSubscriptionChart.data"
          :chart-options="emailsSubscriptionChart.options"
          :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
          chart-type="Bar"
          chart-inside-header
          background-color="rose"
        >
          <md-icon slot="fixed-button">build</md-icon>
          <md-button class="md-simple md-info md-just-icon" slot="first-button">
            <md-icon>refresh</md-icon>
            <md-tooltip md-direction="bottom">Refresh</md-tooltip>
          </md-button>
          <md-button class="md-simple md-just-icon" slot="second-button">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="bottom">Change Date</md-tooltip>
          </md-button>

          <template slot="content">
            <h4 class="title">Website Views</h4>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>updated
              <animated-number :value="10"></animated-number>days ago
            </div>
          </template>
        </chart-card>
      </div>-->
    </div>

    <!-- <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
      <chart-card
        header-animation="false"
        :chart-data="dataCompletedTasksChart.data"
        :chart-options="dataCompletedTasksChart.options"
        chart-type="Line"
        chart-inside-header
        background-color="blue"
      >
        <md-button class="md-simple md-info md-just-icon" slot="first-button">
          <md-icon>refresh</md-icon>
          <md-tooltip md-direction="bottom">Refresh</md-tooltip>
        </md-button>
        <md-button class="md-simple md-just-icon" slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Change Date</md-tooltip>
        </md-button>

        <template slot="content">
          <h4 class="title">Votes</h4>
          <p class="category">Vote graph information</p>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>access_time</md-icon>updated
            <animated-number :value="26"></animated-number>minutes ago
          </div>
        </template>
      </chart-card>
    </div>-->

    <div class="md-layout-item md-size-100 h-55">
      <async-world-map class="map" :data="mapData" v-if="loaded"></async-world-map>
    </div>
  </div>
</template>



<script>
// Replace with your view ID.
var VIEW_ID = "202143083";

import AsyncWorldMap from "@/components/WorldMap/AsyncWorldMap.vue";
import {
  StatsCard,
  ChartCard,
  ProductCard,
  AnimatedNumber,
  GlobalSalesCard,
  GlobalSalesTable
} from "@/components";
import { LIST_TOTAL_VOTES } from "@/store/actions.type"
import { mapGetters } from 'vuex';

export default {
  name: "Dashboard",
  components: {
    StatsCard,
    ChartCard,
    AnimatedNumber,
    ProductCard,
    GlobalSalesCard,
    GlobalSalesTable,
    AsyncWorldMap
  },
  computed: {
    ...mapGetters(["getTotalVotes"])
  },

  methods: {
    queryReports() {
      gapi.client
        .request({
          path: "/v4/reports:batchGet",
          root: "https://analyticsreporting.googleapis.com/",
          method: "POST",
          body: {
            reportRequests: [
              {
                viewId: VIEW_ID,
                dateRanges: [
                  {
                    startDate: "2019-09-20",
                    endDate: "today"
                  }
                ],
                metrics: [
                  {
                    expression: "ga:pageviews"
                  }
                ],
                dimensions: [
                  {
                    name: "ga:deviceCategory"
                  }
                ]
              },
              {
                viewId: VIEW_ID,
                dateRanges: [
                  {
                    startDate: "2019-09-20",
                    endDate: "today"
                  }
                ],
                metrics: [
                  {
                    expression: "ga:pageviews"
                  }
                ],
                dimensions: [
                  {
                    name: "ga:countryIsoCode"
                  }
                ],
                orderBys: [
                  { fieldName: "ga:pageviews", sortOrder: "DESCENDING" }
                ]
              }
            ]
          }
        })
        .then(this.displayResults, console.error.bind(console));
    },
    displayResults(response) {
      this.loaded = false;
      console.log(response);

      this.websiteVisits = response.result.reports[0].data.totals[0].values[0];

      this.desktopVisits =
        response.result.reports[0].data.rows[0].metrics[0].values[0];

      this.mobileVisits =
        response.result.reports[0].data.rows[1].metrics[0].values[0];

      this.tabletVisits =
        response.result.reports[0].data.rows[2].metrics[0].values[0];

      this.pieChart.data.labels = [];
      this.pieChart.data.labels.push(
        Math.ceil((this.desktopVisits / this.websiteVisits) * 100) + "%"
      );
      this.pieChart.data.labels.push(
        Math.ceil((this.mobileVisits / this.websiteVisits) * 100) + "%"
      );
      this.pieChart.data.labels.push(
        Math.ceil((this.tabletVisits / this.websiteVisits) * 100) + "%"
      );

      this.pieChart.data.series = [];
      this.pieChart.data.series.push(this.desktopVisits);
      this.pieChart.data.series.push(this.mobileVisits);
      this.pieChart.data.series.push(this.tabletVisits);

      let isoCode1 = response.result.reports[1].data.rows[0].dimensions[0];
      let isoCode2 = response.result.reports[1].data.rows[1].dimensions[0];
      let isoCode3 = response.result.reports[1].data.rows[2].dimensions[0];
      let isoCode4 = response.result.reports[1].data.rows[3].dimensions[0];
      let isoCode5 = response.result.reports[1].data.rows[4].dimensions[0];
      let isoCode6 = response.result.reports[1].data.rows[5].dimensions[0];

      let pageviews1 =
        response.result.reports[1].data.rows[0].metrics[0].values[0];
      let pageviews2 =
        response.result.reports[1].data.rows[1].metrics[0].values[0];
      let pageviews3 =
        response.result.reports[1].data.rows[2].metrics[0].values[0];
      let pageviews4 =
        response.result.reports[1].data.rows[3].metrics[0].values[0];
      let pageviews5 =
        response.result.reports[1].data.rows[4].metrics[0].values[0];
      let pageviews6 =
        response.result.reports[1].data.rows[5].metrics[0].values[0];

      this.mapData = {
        [isoCode1]: pageviews1,
        [isoCode2]: pageviews2,
        [isoCode3]: pageviews3,
        [isoCode4]: pageviews4,
        [isoCode5]: pageviews5,
        [isoCode6]: pageviews6
      };

      this.countryData = [
        {
          flag: "./img/flags/" + isoCode1 + ".png",
          country: isoCode1,
          sales: pageviews1,
          percent: Math.ceil((pageviews1 / this.websiteVisits) * 100) + "%"
        },
        {
          flag: "./img/flags/" + isoCode2 + ".png",
          country: isoCode2,
          sales: pageviews2,
          percent: Math.ceil((pageviews2 / this.websiteVisits) * 100) + "%"
        },
        {
          flag: "./img/flags/" + isoCode3 + ".png",
          country: isoCode3,
          sales: pageviews3,
          percent: Math.ceil((pageviews3 / this.websiteVisits) * 100) + "%"
        },
        {
          flag: "./img/flags/" + isoCode4 + ".png",
          country: isoCode4,
          sales: pageviews4,
          percent: Math.ceil((pageviews4 / this.websiteVisits) * 100) + "%"
        },
        {
          flag: "./img/flags/" + isoCode5 + ".png",
          country: isoCode5,
          sales: pageviews5,
          percent: Math.ceil((pageviews5 / this.websiteVisits) * 100) + "%"
        },
        {
          flag: "./img/flags/" + isoCode6 + ".png",
          country: isoCode6,
          sales: pageviews6,
          percent: Math.ceil((pageviews6 / this.websiteVisits) * 100) + "%"
        }
      ];

      console.log(this.mapData, "this.mapDAta");
      console.log(this.countryData, "this.countryData");

      this.loaded = true;
    }
  },
  async mounted() {
    await this.$store.dispatch(LIST_TOTAL_VOTES)
    await gapi.signin2.render("g-signin2", {
      // this is the button "id"
      onsuccess: this.queryReports // note, no "()" here
    });
  },
  data() {
    return {
      totalVotes: 0,
      countryData: null,
      loaded: false,
      websiteVisits: 0,
      desktopVisits: 0,
      mobileVisits: 0,
      tabletVisits: 0,
      countryVisits: [],
      pieChart: {
        data: {
          labels: [],
          series: []
        },
        options: {
          height: "230px"
        }
      },
      seq2: 0,
      mapData: {}
    };
  }
};
</script>
