<template>
  <div class="sectors">
    <div v-if="!isAddition">
      <button class="adding" @click="isAddition = true">
        <strong>Add New Sector</strong>
      </button>
    </div>
    <div class="form" v-if="isAddition">
      <form @keyup.enter="addSector">
        <label>
          <b>Sector Name(tr):</b>
          <input type="text" v-model="sector.name.tr" required>
        </label>
        <label>
          <b>Sector Name(en):</b>
          <input type="text" v-model="sector.name.en" required>
        </label>
        <label>
          <b>Sector Name(de):</b>
          <input type="text" v-model="sector.name.de" required>
        </label>
      </form>
      <div class="button-container">
        <button type="button" @click="addSector">ADD</button>
        <button type="button" @click="isAddition = false">Cancel</button>
      </div>
    </div>
    <md-table v-model="sectorList" md-card @md-selected="onSelect" v-else>
      <md-table-toolbar>
        <h1 class="md-title">
          <strong>SECTORS</strong>
        </h1>
      </md-table-toolbar>

      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
        <div class="md-toolbar-section-end" @click="removeItem">
          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="Name(tr)" md-sort-by="name">
          <router-link :to="`/sectors${item.path}`" class="sector-name"> {{item.name.tr}}</router-link>
        </md-table-cell>
        <md-table-cell md-label="Name(en)" md-sort-by="email">{{item.name.en}}</md-table-cell>
        <md-table-cell md-label="Name(de)" md-sort-by="gender"> {{item.name.de}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>


<script>
import {ProductService} from "../../Service/service";
export default {
  name: "Sectors",
  data(){
    return{
      isAddition:false,
      selected:[],
      sector:{
        name:{
          tr:"",
          en:"",
          de:"",
        },
        path:""
      },
      sectorList: [],
    }
  },methods:{
    async removeItem(){
      while (this.selected.length !== 0){
        let deletedItem = this.selected.pop();
        await ProductService.deleteSector(deletedItem);
      }
      this.sectorList = await ProductService.readSectors()
    },
    onSelect (items) {
      this.selected = items
    },
    getAlternateLabel (count) {
      let plural = ''
      if (count > 1) {
        plural = 's'
      }
      return `${count} sector${plural} selected`
    },
    addSector(){
      this.sectorList.push(this.sector);
      this.sector.path = "/"+this.sector.name.en.split(" ").join("_");
      ProductService.addNewSector(this.sector);
      this.isAddition = false
    }
  },async created() {
    this.sectorList = await ProductService.readSectors()
  }
}
</script>

<style scoped>
.form {
  width: 40vw;
  height: 40vh;
  margin: 10vh auto;

}
form {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
}
input {
  width: 100%;
  height: 4vh;
}
label{
  text-align: left;
}
.button-container {
  margin-top: 2vh;
  height: 5vh;
  width: 100%;
}
button {
  cursor: pointer;
  width: 50%;
  height: 100%;
}
label {
  margin-top: 3vh;
}
.adding {
  height: 5vh;
}
.sector-name {
  font-size: 1rem !important;
  color: rgba(255, 0, 0, 1) !important;
  font-weight: bold !important;
}
.sector-name:hover {
  font-size: 1rem !important;
  color: rgba(0, 0, 255, 1) !important;
  font-weight: bolder !important;
  background: none;
}
</style>