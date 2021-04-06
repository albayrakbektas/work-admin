<template>
  <div class="table">
    <div class="header hei">
      <div class="header-brand bold">Brand</div>
      <div class="header-code bold">Code</div>
      <div class="header-photo bold">Photo</div>
      <div></div>
    </div>
    <div class="content hei">
      <div class="brand">{{ brandList }}</div>
      <div class="code">{{ codeList }}</div>
      <div class="photo">
        <img :src="photoList" alt="..">
      </div>
      <div class="remove">
        <span class="material-icons" >
          delete
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductTable",
  props: {
    brandList: String,
    codeList: String,
    photoList: String
  }

}
</script>

<style scoped>
.header {
  border: 1px solid #000000;
  display: grid;
  grid-template-columns: repeat(3, 1fr) 20px;
  justify-items: center;
  align-items: center;
}
.bold {
  font-weight: bold;
}
.hei {
  height: 2em;
  width: 90%;
  margin: 0 auto;
}
.content {
  border: 1px solid rgba(0, 0, 0, .5);
  display: grid;
  grid-template-columns: repeat(3, 1fr) 20px;
  justify-items: center;
  align-items: center;
}
.material-icons {
  cursor: pointer;
}
img {
  height: 5vh;
  width: 3vw;
}

</style>
