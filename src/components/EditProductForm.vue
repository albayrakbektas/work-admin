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
        <strong>Small Image:</strong>
        <input type="file" v-on:change="previewFiles($event)" name="file[]" multiple required>
      </label>
      <label>
        <strong>Large Image:</strong>
        <input type="file" v-on:change="previewLargeFiles($event)" name="file[]" multiple required>
      </label>
      <div class="button-container">
        <button type="button" v-on:click="editProduct">ADD</button>
        <button type="button" v-on:click="cancelForm">Cancel</button>
      </div>
    </form>
    <div class="loader" v-if="uploading"></div>
  </div>
</template>

<script>
import { ProductService } from "../../Service/service";

export default {
  name: "EditProductForm",
  props: ['cancelForm', 'brandValue', 'codeValue', 'category', 'urlValue', 'largeImageUrlValue'],
  data () {
    return {
      brandData: '',
      codeData: '',
      selectedData: '',
      selectedLargeData: '',
      categoryData: '',
      urlData: '',
      largeImageUrlData: '',
      uploading: false,
    }
  },
  created() {
    this.brandData = this.$props.brandValue
    this.codeData = this.$props.codeValue
    this.urlData = this.$props.urlValue
    this.largeImageUrlData = this.$props.largeImageUrlValue
    this.categoryData = this.$props.category
    console.log(this.largeImageUrlData);
  },
  methods: {
    previewFiles(event) {
      this.selectedData = event.target.files[0]
      console.log(this.selectedData);
    },
    previewLargeFiles(event) {
      this.selectedLargeData = event.target.files[0]
      console.log(this.selectedLargeData);
    },
    async editProduct () {
      this.uploading = true
      if (this.selectedData !== '' && this.selectedLargeData !== '') {
        await ProductService.writeProduct(this.categoryData, this.codeData, this.brandData, this.urlData, this.largeImageUrlData, this.selectedData, this.selectedLargeData)
        location.reload()
      } else if (this.selectedData !== '') {
        this.selectedLargeData = this.selectedData
        this.largeImageUrlData = this.urlData
        await ProductService.writeProduct(this.categoryData, this.codeData, this.brandData, this.urlData, this.largeImageUrlData, this.selectedData, this.selectedLargeData)
        location.reload()
      } else {
        alert("Upload A File")
        this.uploading = false
      }
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
  height: 2rem;
  cursor: pointer;
}
button:hover {
  font-weight: bolder;
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  margin: 0 auto;
}
/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>