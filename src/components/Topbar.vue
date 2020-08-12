<template>
  <div class="p-grid">
    <div class="layout-topbar p-shadow-2 p-d-flex p-jc-between p-justify-between">
      <a href="#" class="topbar-title p-d-none p-d-md-inline-flex">Dead by Statistics</a>
      <ul class="p-jc-between">
        <li><a class="pi pi-plus" href="#" @click="openAddMatch()" /></li>
        <li><a class="pi pi-download" href="#" @click="download()" /></li>
        <li><a class="pi pi-upload" href="#" @click="openImport()" /></li>
        <li class="breaker" />
        <li><a class="pi pi-github" target="_blank" href="https://github.com/Schrotty" /></li>
      </ul>
    </div>

    <Dialog :visible.sync="displayImport">
      <template #header>
        <h3>Import Data</h3>
      </template>

      <Textarea v-model="value" rows="10" />

      <template #footer>
        <Button label="Abort" icon="pi pi-times" class="p-button-text" @click="closeImport()"/>
        <Button label="Start Import" icon="pi pi-check" autofocus @click="importData()" />
      </template>
    </Dialog>

    <Dialog :visible.sync="displayNewMatch">
      <template #header>
        <h3>Add Match</h3>
      </template>

      <div class="p-grid">
        <div class="p-col-4">
          <Listbox v-model="selectedKiller" :options="killer" optionLabel="killer" />
        </div>

        <div class="p-col-4">
          <Listbox v-model="selectedMap" :options="maps" optionLabel="map" />
        </div>

        <div class="p-col-4">
          <Listbox v-model="result" :options="results" optionLabel="name" />
        </div>
      </div>

      <template #footer>
        <Button label="Abort" icon="pi pi-times" class="p-button-text" @click="closeAddMatch()"/>
        <Button label="Save" icon="pi pi-check" autofocus @click="saveMatch()" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import DataService from "../../service/DataService";

export default {
  name: "Topbar",
  data() {
    return {
      displayImport: false,
      displayNewMatch: false,
      value: null,
      selectedKiller: null,
      killer: null,
      selectedMap: null,
      maps: null,
      result: null,
      results: [
        {name: 'Victory'},
        {name: 'Defeat'}
      ]
    }
  },
  service: null,
  created() {
    this.service = new DataService();
  },
  mounted() {
    this.service.getKiller().then(data => this.killer = data);
    this.service.getMaps().then(data => this.maps = data);
  },
  methods: {
    download() {
      const FileSaver = require('file-saver');
      const blob = new Blob([localStorage.getItem('matches')], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, "matches.json");
    },
    openImport() {
      this.displayImport = true;
    },
    importData() {
      this.displayImport = false;
      if (this.value !== null && this.value !== "") {
        localStorage.setItem("matches", this.value);
      }

      this.closeImport();
    },
    closeImport() {
      this.displayImport = false;
      this.value = null;
    },
    openAddMatch() {
      this.displayNewMatch = true;
    },
    closeAddMatch() {
      this.displayNewMatch = false;
      this.selectedKiller = null;
      this.selectedMap = null;
      this.result = null;
    },
    saveMatch() {
      const matches = JSON.parse(localStorage.getItem("matches"));
      matches["data"].push(JSON.parse('{"killer":"' + this.selectedKiller.killer + '","map":"' + this.selectedMap.map + '","result":"' + this.result.name.toLowerCase() + '"}'));
      localStorage.setItem("matches", JSON.stringify(matches));

      dispatchEvent(new CustomEvent("update"));
      this.closeAddMatch();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/variables";
@import "../assets/utils";

.layout-topbar {
  background: $primary-color;
  color: $text-color;
  height: $topbar-height;
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  top: 0;
  overflow: hidden;
  z-index: 999;
  position: fixed;
}

.layout-topbar ul {
  height: $topbar-height;
  padding: 0;
  margin: 0;
  display: flex;
  width: 20%;
}

.layout-topbar li {
  height: 100%;
  line-height: $topbar-height;
}

.layout-topbar a {
  height: 100%;
  line-height: $topbar-height;
  display: block;
  min-width: 60px;
  font-size: 1.5rem;
}

.layout-topbar li a:hover {
  border-bottom: 2px solid white;
}

.layout-topbar  li.breaker {
  width: 1px;
  border-left: 1px solid #4e4e4e;
  height: $topbar-height - 30;
  margin-top: 15px;;
}

@media (max-device-width: 800px) {
  .layout-topbar ul {
    width: 100%;
  }
}

</style>