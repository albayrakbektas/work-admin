<template>
  <div class="building">
    <ProductForm :open-inputs="openNewProductAdd" />
    <div class="form">
      <form v-if="openNewAddProduct">
        <label>
          <b>Brand:    </b>
          <input type="text" v-model="brand" required >
        </label>
        <label>
          <b>Code:    </b>
          <input type="text" v-model="code" required >
        </label>
        <label>
          <input type="file" @change="previewFiles" name="files[]" multiple>
        </label>
        <div class="button-container">
          <button type="button" @click="writeProductData">ADD</button>
          <button type="button" @click="openNewProductAdd">Cancel</button>
        </div>
      </form>
    </div>
<!--    <div v-if="imgOk" style="height: 30px; width: 100%;display: grid;grid-template-columns: repeat(3, 1fr)">-->
<!--      <div>brand:{{brand}}</div>-->
<!--      <div>code:{{code}}</div>-->
<!--      <img :src="srcImg" alt=".." style="height: 50px">-->
<!--    </div>-->
    <div class="loader" v-if="uploading"></div>
    <ProductTable v-for="(product, index) in productList" :brand-list="brand" :code-list="code" :photo-list="srcImg" :key="index" />
  </div>
</template>

<script>

import ProductForm from "../components/ProductForm";
import {db, fs} from "../../firebaseConfig"
import ProductTable from "../components/ProductTable";
export default {
  name: "Building",
  data () {
    return {
      productList: [],
        brandList: '',
        codeList: '',
        photoList: '',
      uploading: false,
      openNewAddProduct: false,
      brand: '',
      code: '',
      url: 'gs://akinwork-dc979.appspot.com/building/',
      selectedFile: '',
      srcImg: '',
      imgOk: false
    }
  },
  components: {ProductTable, ProductForm},
  methods: {
    previewFiles(event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile);
    },
    openNewProductAdd () {
      this.openNewAddProduct = !this.openNewAddProduct
    },
    writeProductData () {
      this.productList.push({
        brandList: this.brand,
        codeList: this.code,
        photoList: this.srcImg
      })
      this.uploading = true
      db.ref('product/building/' + this.code).set({
        brand: this.brand,
        code: this.code,
        url: this.url + this.code
      })
      .then(() => {
        let myFileRef = fs.ref().child('/building/'+this.code).put(this.selectedFile)
        myFileRef.on('state_changed',
            (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              console.log('Upload is ' + progress + '% done')
          },
            (error) => {
              console.log(error);
            },
            () => {
              myFileRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.srcImg = downloadURL
                this.imgOk = true
                console.log('File available at', downloadURL);
                this.uploading = false
              });
            }
        )
      })
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
}

button {
  width: 50%;
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
