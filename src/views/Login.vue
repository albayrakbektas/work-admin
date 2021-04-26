<template>
  <div class="login">
    <div class="login-container">
      <div class="login-container-area">
        <form @keyup.enter="signIn">
          <label>
            EMAIL <br>
            <input class="user" type="email" v-model="email" required>
          </label>
          <label v-if="isChange">
            PASSWORD <br>
            <input class="user" type="password" v-model="password" >
          </label>
        </form>
        <div class="button-grid">
          <div class="remember">

          </div>
          <button type="submit" @click="signIn" v-if="isChange">Sign In</button>
          <button type="submit" @click="changePassword" v-if="!isChange">SUBMIT</button>
        </div>
      </div>
      <div class="directions" v-if="isChange" @click="passwordChanging">
            Lost Your Password ?
      </div>
      <div class="directions" v-if="!isChange" @click="passwordChanging">
        Back To Login
      </div>
    </div>
  </div>
</template>

<script>

import 'firebase/auth'
import '../../firebaseConfig'
import {fa} from '../../firebaseConfig'
export default {
  name: "Login",
  data () {
    return {
      email: '',
      password: '',
      isChange: true,
    }
  },
  methods: {
    passwordChanging () {
      this.isChange = !this.isChange
    },
    signIn () {
      fa.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.$router.push('/home')
      })
      .catch(() => {
        alert("Invalid Email or Password")
      })
    },
    changePassword () {
      if (this.email !== '') {
        fa.sendPasswordResetEmail(this.email).then(() => {
          alert("Link Send")
        }).then(() => {
          this.isChange = !this.isChange
        })
      } else {
        alert("Write a Email Address")
      }
    }
  },
}
</script>

<style scoped>

.login {
  height: 100vh;
  width: 100vw;
  display: grid;
  align-items: center;
  justify-items: center;
}

.login-container-area {
  display: grid;
  grid-template-rows: 2fr 1fr;
  border: 1px solid #f5f5f5;
  padding: 1em;
  box-shadow: .5em 1em rgba(200,200,200, .5);
  background-color: rgba(200, 200, 200, .3);
  height: 40vh;
  width: 30vw;
}

form {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  height: 100%;
}

.user {
  width: 100%;
  height: 2.5em;
}

.user a {
  font-size: 2rem;
}

.button-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  justify-items: start;
  align-items: center;
}

button {
  width: 60%;
  padding: .5em;
  background-color: #2c3e50;
  color: #ffffff;
  cursor: pointer;
}

.remember {
  float: left;
}

label {
  text-align: left;
}


.directions {
  float: left;
  margin-top: 1em;
  font-size: 1.2rem;
  font-weight: normal;
  cursor: pointer;
  color: #ff0000;
}
.directions:hover {
  color: #000000 !important;
  background-color: transparent;
}

@media (max-width: 990px) {
  .login-container-area {
    width: 80vw;
  }
}

</style>
