<template>
  <div class="form">
    <form>
      <label>
        <b>Brand:    </b>
        <input type="text" v-model="brandData" required>
      </label>
      <label>
        <b>Code:    </b>
        <input type="text" v-model="codeData" disabled required>
      </label>
      <label>
        <input type="file" v-on:change="previewFiles($event)" name="file[]" multiple required>
      </label>
      <div class="button-container">
        <button type="button" v-on:click="editProduct">ADD</button>
        <button type="button" v-on:click="cancelForm">Cancel</button>
      </div>
    </form>
    {{brandData}} <br> {{codeData}} <br>
    <a :href="urlData" target="_blank">Click for Image</a> {{this.urlData}}
  </div>
</template>

<script>
import { ProductService } from "../../Service/service";

export default {
  name: "EditProductForm",
  props: ['cancelForm', 'brandValue', 'codeValue', 'category', 'urlValue'],
  data () {
    return {
      brandData: '',
      codeData: '',
      selectedData: '',
      categoryData: '',
      urlData: '',
    }
  },
  created() {
    this.brandData = this.$props.brandValue
    this.codeData = this.$props.codeValue
    this.urlData = this.urlValue
    this.categoryData = this.$props.category
    console.log(this.selectedData);
  },
  methods: {
    previewFiles(event) {
      this.selectedData = event.target.files[0]
      console.log(this.selectedData);
    },
    async editProduct () {
      await ProductService.writeProduct(this.categoryData, this.codeData, this.brandData, this.urlData, this.selectedData)
    },
}
}
</script>

<style scoped>
.form {
  display: grid;
  width: 20vw;
  margin: 4vh auto;
  align-items: center;
  justify-content: center;
}

form {
  display: grid;
  grid-gap: 2vh;
  justify-items: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.button-container {
  width: 100%;
}

button {
  width: 50%;
}
</style>