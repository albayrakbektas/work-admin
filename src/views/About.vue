<template>
  <div class="about">
    <form>
      <label>
        TURKISH
        <textarea v-model="textAreaTR"></textarea>
      </label>
      <label>
        ENGLISH
        <textarea v-model="textAreaEN"></textarea>
      </label>
      <label>
        DEUTSCHE
      <textarea v-model="textAreaDE"></textarea>
    </label>
    </form>
    <button type="submit" @click="writeData"> UPDATE </button>
  </div>
</template>

<script>
import { db } from '../../firebaseConfig'
export default {
  name: "About",
  data () {
    return {
      textAreaTR: null,
      textAreaEN: null,
      textAreaDE: null,
    }
  },
  async created () {
    await this.getData()
  },
  methods: {
    writeData () {
      db.ref('about/').set({
        tr: this.textAreaTR,
        en: this.textAreaEN,
        de: this.textAreaDE
      })
        .then(() => {
          window.location.reload()
        })
    },
    getData () {
      db.ref('about/').on('value', (snapshot) => {
        this.textAreaTR = snapshot.val().tr
        this.textAreaEN = snapshot.val().en
        this.textAreaDE = snapshot.val().de
      })
    }
  }
}
</script>

<style scoped>

label {
  font-size: 2rem;
  font-weight: bold;
}
form {
  width: 100%;
  height: 60vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  padding: 1rem 1rem 1rem 1rem;
}
textarea {
  width: 100%;
  height: 100%;
  font-size: 1rem;
  line-height: 1.5rem;
  margin-top: 2rem;

}
button {
  cursor: pointer;
  font-size: 1.5rem;
  padding: .5rem;
  margin-top: 4rem;
  width: 10rem;
}
</style>
