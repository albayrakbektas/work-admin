<template>
  <div>
    <md-table v-model="product" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">  PRODUCTS</h1>
      </md-table-toolbar>

      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

        <div class="md-toolbar-section-end" @click="deleteItem">
          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="Brand" md-sort-by="name">{{ item.brand }}</md-table-cell>
        <md-table-cell md-label="Code" md-sort-by="email">{{ item.code }}</md-table-cell>
        <md-table-cell md-label="Image" md-sort-by="gender">
          <a :href="item.url" target="_blank">
            <img :src="item.url" alt="">
          </a>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <p>Selected:</p>
    {{ selected }}
  </div>
</template>

<script>
export default {
  name: 'TableMultiple',
  props: ['product'],
  data: () => ({
    selected: [],
  }),
  methods: {
    onSelect (items) {
      this.selected = items
    },
    deleteItem (item) {
      this.selected.splice(item, 1)
      return this.selected
    },
    getAlternateLabel (count) {
      let plural = ''

      if (count > 1) {
        plural = 's'
      }
      return `${count} user${plural} selected`
    }
  }
}
</script>

<style scoped>
.md-table .md-table {
  margin-top: 16px
}
img {
  height: 5vh;
  width: 5vw;
}
a {
  height: 5vh;
  width: 5vw;
}
a:hover {
  text-decoration: none;
  text-decoration-color: white;
}
</style>