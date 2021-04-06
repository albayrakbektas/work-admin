<template>
  <div class="login">
    <div class="login-container">
      <div class="login-container-area">
        <form>
          <label>
            EMAIL <br>
            <input class="user" type="email" v-model="email" required>
          </label>
          <label>
            PASSWORD <br>
            <input class="user" type="password" v-model="password" required>
          </label>
        </form>
        <div class="button-grid">
          <div class="remember">
            <label>
              <input type="checkbox">
              Remember Me
            </label>
          </div>
          <button type="submit" @click="signIn">Sign In</button>
        </div>
      </div>
      <div class="directions">
          <a href="#">
            Lost Your Password?
          </a>
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
      password: ''
    }
  },
  methods: {
    signIn () {
      fa.signInWithEmailAndPassword(this.email, this.password)
      .then((res) => {
        let user = res.user
        let userId = fa.currentUser.uid
        console.log(user);
        console.log(userId);
        this.$router.push('/home')
      })
      .catch((e) => {
        console.log(e);
      })
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
}

.remember {
  float: left;
}

label {
  text-align: left;
}

.directions {
  margin-top: 1em;
}

a {
  float: left;
}
a:hover {
  color: #000000 !important;
  background-color: transparent;
}

@media (max-width: 990px) {
  .login-container-area {
    width: 80vw;
  }
}

</style>
