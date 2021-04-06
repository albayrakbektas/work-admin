<template>
  <div class="mining">
    <ProductForm :open-inputs="openNewProductAdd" />
    <div class="form">
      <form v-if="openNewAddProduct">
        <label>
          <b>Brand:    </b>
          <input type="text" >
        </label>
        <label>
          <b>Code:    </b>
          <input type="text" >
        </label>
        <label>
          <input type="file">
        </label>
        <div class="button-container">
          <button type="button">ADD</button>
          <button type="button" @click="openNewProductAdd">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ProductForm from "../components/ProductForm";
export default {
  name: "Mining",
  data () {
    return {
      openNewAddProduct: false
    }
  },
  components: {ProductForm},
  methods: {
    openNewProductAdd () {
      this.openNewAddProduct = !this.openNewAddProduct
    }
  }
}
</script>

<style scoped>
.mining {
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
</style>
