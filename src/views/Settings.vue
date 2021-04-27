<template>
  <div class="settings">
    <div class="user-info" v-if="!isUpdating">
      <div class="header">
        <p>
          ADMIN
        </p>
        <p>
          INFORMATION
        </p>
      </div>
      <div class="user-email txt">
        Email:
        <div class="txt-normal">
          {{ currentEmail}}
        </div>
      </div>
      <div class="user-password txt">
        Password:
        <div class="txt-normal">
          {{ currentPassword}}
        </div>
      </div>
      <button class="single-button" @click="openUpdating">CHANGE</button>
    </div>
    <div class="form">
      <form v-if="isUpdating">
        <label>
          Email <br>
          <input type="email" required v-model="email">
        </label>
        <label>
          Password <br>
          <input type="password" required v-model="password" placeholder="********">
        </label>
        <label>
          Password <br>
          <input type="password" required v-model="passwordRepeat" placeholder="********">
        </label>
      </form>
      <div class="buttons" v-if="isUpdating">
        <button type="submit" @click="updateUser">UPDATE</button>
        <button @click="openUpdating">CANCEL</button>
      </div>
    </div>
  </div>
</template>

<script>
import {fa} from "../../firebaseConfig";
export default {
  name: "Settings",
  data () {
    return {
      currentEmail: null,
      currentPassword: '********',
      email: null,
      password: null,
      passwordRepeat: null,
      isUpdating: false
    }
  },
  methods: {
    openUpdating () {
      this.isUpdating = !this.isUpdating
    },
    getUserInfo () {
      let user = fa.currentUser
      this.currentEmail = user.email
      this.email = user.email
    },
    updateUser () {
      let user = fa.currentUser
      if (this.password === this.passwordRepeat) {
        user.updateEmail(this.email).then(() => {
          user.updatePassword(this.password).then(() => {
            alert("Updated Successfully")
          }).then(() => {
            fa.signOut().then(() => {
              this.$router.replace('/')
            })
          })
        })

      } else {
        alert("Passwords Doesn't Match")
      }
    }
  },
  async created() {
    await this.getUserInfo()
  }
}
</script>

<style scoped>
.header {
  display: grid;
  font-weight: bold;
  font-size: 2rem;
  height: 6rem;
  align-items: center;
}
.user-info {
  display: grid;
  grid-template-rows: 6rem 2rem 2rem 4rem;
  grid-gap: .4rem;
  width: min-content;
  align-items: center;
  justify-items: start;
  margin: 5rem auto;
}
.txt {
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  gap: .4rem;
}
.txt-normal {
  font-weight: normal;
  font-size: 1rem;
}
.form {
  display: grid;
  grid-template-rows: 3fr 1fr;
  justify-items: center;
  align-items: center;
  width: 25vw;
  margin: 5rem auto;
}
form {
  width: 100%;
  display: grid;
  grid-template-rows: repeat(3,1fr);
  align-items: center;
  justify-items: end;
}
label {
  width: 100%;
  height: 5rem;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
}
input {
  width: 100%;
  height: 50%;
  font-size: 1rem;
  font-weight: normal;
  padding-left: .2rem;
}
.buttons {
  width: 100%;
  height: 100%;
}
button {
  width: 50%;
  height: 50%;
  cursor: pointer;
  font-weight: normal;
  font-size: 1.2rem;
}
button:hover {
  font-weight: bolder;
}
.single-button {
  width: 100%;
}
</style>