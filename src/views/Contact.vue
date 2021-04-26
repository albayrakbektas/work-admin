<template>
  <div class="contact">
    <div class="contact-grid">
      <form>
        <label>
          ADDRESS <br>
          <input type="text" v-model="address">
        </label>
        <label>
          MAP ADDRESS <br>
          <input type="text" v-model="map">
        </label>
        <label>
          PHONE <br>
          <input type="number" v-model="phone">
        </label>
        <label>
          EMAIL <br>
          <input type="email" v-model="email">
        </label>
        <label>
        </label>
      </form>
      <button type="submit" @click="updateData">SUBMIT</button>
    </div>
    <img :src="imgSrc" alt="">
  </div>
</template>

<script>
import {fs, db} from '../../firebaseConfig'
export default {
  name: 'Contact',
  data () {
    return {
      address: null,
      map: null,
      phone: null,
      email: null,
      imgSrc: null,
    }
  },
  async mounted() {
    await this.getFile()
    this.getData()
  },
  methods: {
    getFile () {
      fs.ref('/contact/contact.jpeg').getDownloadURL()
      .then((url) => {
        this.imgSrc = url
      })
    },
    getData () {
      db.ref('/contact/').on('value', (snapshot) => {
        const data = snapshot.val()
        this.address = data.address
        this.map = data.map
        this.phone = data.phone
        this.email = data.email
      })
    },
    updateData () {
      db.ref('/contact').set({
        address: this.address,
        phone: this.phone,
        email: this.email,
        map: this.map
      })
    }
  }
}
</script>

<style scoped>

.contact-grid {
  height: 44vh;
  width: 100%;
}
form {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  margin: 0 auto;
}
input {
  height: 4vh;
  width: 40vw;
  font-size: 1rem;
  padding-left: .2rem;
}
img {
  height: 60vh;
  width: 100%;
}
label {
  margin: 1vh auto;
  text-align: left;
  font-weight: bold;
}
button {
  height: 5vh;
  width: 40vw;
}
button {
  cursor: pointer;
  font-weight: bolder;
  font-size: 1.5rem;
}
</style>