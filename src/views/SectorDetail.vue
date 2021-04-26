<template>
  <div class="building">
    <EditProductForm
        v-if="isEdit"
        :cancel-form="edit"
        :category="$route.params.id"
        :brand-value="brandValue"
        :code-value="codeValue"
        :url-value="urlValue"
    />
    <ProductForm :open-inputs="openNewProductAdd" v-if="!isEdit"/>
    <div class="form" v-if="!isEdit">
      <form v-if="openNewAddProduct">
        <label>
          <b>Brand:    </b>
          <input type="text" v-model="brand" required>
        </label>
        <label>
          <b>Code:    </b>
          <input type="text" v-model="code" required>
        </label>
        <label>
          Small Size:
          <input type="file" @change="previewFiles" name="file[]" multiple required>
        </label>
<!--        <label>-->
<!--          Large Size:-->
<!--          <input type="file" @change="previewLargeFiles" name="file[]" multiple required>-->
<!--        </label>-->
        <div class="button-container">
          <button type="button" @click="writeProductData">ADD</button>
          <button type="button" @click="openNewProductAdd">Cancel</button>
        </div>
      </form>
      <div class="loader" v-if="uploading"></div>
    </div>
    <button class="back" @click="back">BACK</button>
    <TestTable :product="product" :edit="edit" v-if="!isEdit" :category="`/${$route.params.id}/`" :category-header="$route.params.id.toUpperCase()" />
  </div>
</template>

<script>
import ProductForm from "../components/ProductForm";
import { ProductService } from "../../Service/service";
import TestTable from "@/components/TestTable";
import EditProductForm from "@/components/EditProductForm";
export default {
  name: "SectorDetail",
  data () {
    return {
      brandValue: '',
      codeValue: '',
      previewFile: '',
      urlValue: '',
      isEdit: false,
      uploading: false,
      product: [],
      openNewAddProduct: false,
      brand: '',
      code: '',
      url: 'gs://akinwork-dc979.appspot.com/' + this.$route.params.id + '/',
      selectedFile: null,
      selectedLargeFile: null,
      imgOk: false,
      srcImg: '',
      selectedProduct: []
    }
  },
  components: {EditProductForm, TestTable, ProductForm},
  async mounted () {
    this.product = await ProductService.getProduct(this.$route.params.id)
    await ProductService.getFile(this.product, this.$route.params.id)
  },
  methods: {
    edit (item) {
      this.brandValue = item.brand
      this.codeValue = item.code
      this.urlValue = item.url
      this.isEdit = !this.isEdit
    },
    previewFiles(event)
    {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile);
    },
    back() {
      this.$router.replace('/sectors')

    },
    openNewProductAdd()
    {
      this.openNewAddProduct = !this.openNewAddProduct
    },
    async writeProductData() {
      this.uploading = true
      if (this.brand !== '' && this.code !== '' && this.selectedFile !== '') {
        await ProductService.writeProduct(this.$route.params.id, this.code, this.brand, this.url, this.selectedFile).then(() => {
          location.reload()
        })
      } else {
        alert('Tum Bilgileri Giriniz..')
      }
    },
  }
}
</script>

<style scoped>
.building {
  position: relative;
  height: 100%;
  width: 100%;
}
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
  height: 2rem;
}
button {
  width: 50%;
  height: 100%;
  cursor: pointer;
}
.back {
  height: 3rem;
  width: 9rem;
  margin-right: 75vw;
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