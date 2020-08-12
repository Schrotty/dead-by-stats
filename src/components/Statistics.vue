<template>
    <div id="statistics" class="p-grid">
      <div class="p-col-12">
        <Card id="data" class="compact">
          <template slot="content">
            <DataTable :value="statistics" :scrollable="true" scrollHeight="300px" :loading="loading">
              <template #empty>
                No matches found!
              </template>
              <Column field="killer" header="Killer"></Column>
              <Column field="map" header="Map" headerStyle="text-align: center" bodyStyle="text-align: center"></Column>
              <Column field="result" header="Result" headerStyle="text-align: center" bodyStyle="text-align: center">
                <template #body="statProps">
                  <span :class="'badge badge-' + statProps.data.result">{{statProps.data.result}}</span>
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>

      <div class="p-col-6">
        <Card>
          <template slot="title">
            <h3>Victory Statistics</h3>
          </template>
          <template slot="content">
            <Chart type="pie" :data="victoryData" :options="options"/>
          </template>
        </Card>
      </div>

      <div class="p-col-6">
        <Card>
          <template slot="title">
            <h3>Killer Statistics</h3>
          </template>
          <template slot="content">
            <Chart type="bar" :data="killerData" :options="stackedOptions"/>
          </template>
        </Card>
      </div>
  </div>
</template>

<script>
import StatisticsService from "../../service/StatisticsService";

export default {
  name: "Statistics",
  data() {
    return {
      loading: false,
      statistics: null,
      victoryData: null,
      killerData: null,
      statuses: [
          'victory', 'defeat'
      ],
      options: {
        responsive: true
      },
      stackedOptions: {
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    }
  },
  service: null,
  created() {
    this.service = new StatisticsService();

    addEventListener("update", function (e) {
      console.log(e);
    })
  },
  mounted() {
    this.loading = true
    this.statistics = this.service.getData();
    this.victoryData = this.service.getVictoryData();
    this.killerData = this.service.getKillerData();
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/variables";
@import "../assets/utils";

#statistics {
  margin-top: $topbar-height + 8px;
}

.table-head {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.table-head > Button {
  margin-left: 5px;
}

.badge {
  font-family: 'Roboto', sans-serif;
  border-radius: 2px;
  padding: .25em .5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
}

.badge-victory {
  background-color: $green-background;
  color: $green-color;
}

.badge-defeat {
  background-color: $red-background;
  color: $red-color;
}
</style>