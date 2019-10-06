<template>
  <div class="md-layout">


    <div class="md-layout-item md-size-50">
              <chart-card
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
            <h4 class="title">
              Pie Chart
            </h4>
          </template>
          <template slot="footer">
            <div class="md-layout">
              <div class="md-layout-item md-size-100">
                <h6 class="category">Legend</h6>
              </div>
              <div class="md-layout-item">
                <i class="fa fa-circle text-info"></i> Apple
                <i class="fa fa-circle text-warning"></i> Samsung
                <i class="fa fa-circle text-danger"></i> Windows Phone
              </div>
            </div>
          </template>
        </chart-card>
    </div>


    <div class="md-layout md-layout-item md-size-50">


      <div class="md-layout-item  md-size-50 ">
        <stats-card header-color="rose">
          <template slot="header">
            <div class="card-icon">
              <md-icon>equalizer</md-icon>
            </div>
            <p class="category">Website Visits</p>
            <h3 class="title">
              <animated-number :value="75"></animated-number>.<animated-number
                :value="521"
              ></animated-number>
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>local_offer</md-icon>
              Tracked from Google Analytics
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-size-50 ">
        <stats-card header-color="blue">
          <template slot="header">
            <div class="card-icon">
              <md-icon>list_alt</md-icon>
            </div>
            <p class="category">Votes</p>
            <h3 class="title">
              <animated-number :value="34"></animated-number>,<animated-number
                :value="245"
              ></animated-number>
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Last <animated-number :value="24"></animated-number> Hours
            </div>
          </template>
        </stats-card>
      </div>

      <div       class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"    >
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
              <md-icon>access_time</md-icon>
              updated <animated-number :value="10"></animated-number> days ago
            </div>
          </template>
        </chart-card>
      </div>

    </div>






    


    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
    >
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
          <p class="category">
            Vote graph information
          </p>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>access_time</md-icon>
            updated
            <animated-number :value="26"></animated-number> minutes ago
          </div>
        </template>
      </chart-card>
    </div>
    <div class="md-layout-item md-size-50">
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
              <global-sales-table></global-sales-table>
            </div>

          </div>
        </template>
      </global-sales-card>
    </div>

    <div class="md-layout-item md-size-100 h-55">
      <async-world-map class="map" :data="mapData"></async-world-map>
    </div>
    



  </div>
</template>

<script>
import AsyncWorldMap from "@/components/WorldMap/AsyncWorldMap.vue";
import {
  StatsCard,
  ChartCard,
  ProductCard,
  AnimatedNumber,
  GlobalSalesCard,
  GlobalSalesTable
} from "@/components";

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
  data() {
    return {
      pieChart: {
        data: {
          labels: ["62%", "32%", "6%"],
          series: [62, 32, 6]
        },
        options: {
          height: "230px"
        }
      },
      product1: "./img/card-2.jpg",
      product2: "./img/card-3.jpg",
      product3: "./img/card-1.jpg",
      seq2: 0,
      mapData: {
        AU: 760,
        BR: 550,
        CA: 120,
        DE: 1300,
        FR: 540,
        GB: 690,
        GE: 200,
        IN: 200,
        RO: 600,
        RU: 300,
        US: 2920
      },
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]]
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De"
          ],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      }
    };
  }
};
</script>
