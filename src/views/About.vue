<template>
  <div class="about">
    <form>
      <label>
        <textarea v-model="textArea"></textarea>
      </label>
    </form>
    <button type="submit" @click="writeData"> GÜNCELLE </button>
  </div>
</template>

<script>
import { db } from '../../firebaseConfig'
export default {
  name: "About",
  data () {
    return {
      textArea: null
    }
  },
  async created () {
    await this.getData()
  },
  methods: {
    writeData () {
      db.ref('about/').set({
        textarea: this.textArea
      })
        .then(() => {
          window.location.reload()
        })
    },
    getData () {
      db.ref('about/').on('value', (snapshot) => {
        this.textArea = snapshot.val().textarea
      })
    }
  }
}
</script>

<style scoped>
textarea {
  margin-top: 10vh;
  height: 60vh;
  width: 40vw;
}
button {
  font-size: 1.5rem;
  padding: .5rem;
}
</style>
