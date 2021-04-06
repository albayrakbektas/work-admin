<template>
  <div class="product-form" @click="openInputs">
    <div class="add-new-item">
      <span class="material-icons">
        add_circle
      </span>
      <span>
        ADD NEW ITEM
      </span>
    </div>
    <slot />
  </div>
</template>

<script>

export default {
  name: "ProductForm",
  props: {
    openInputs: Function
  }
}
</script>

<style scoped>
.add-new-item {
  display: grid;
  align-items: center;
  cursor: pointer;
}

</style>
