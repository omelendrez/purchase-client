<template>

  <b-card no-block id="loginCard">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="loginForm">

      <b-form-group>
        <b-form-input id="user_name" type="text" v-model="form.user_name" required autofocus="true" autocomplete="username" placeholder="User name">
        </b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input id="password" type="password" v-model="form.password" required autocomplete="current-password" placeholder="Password">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="info">
        <i class="fas fa-user"></i>Login
      </b-button>
      <b-button type="reset">Reset</b-button>

    </b-form>

    <b-alert variant="danger" :show="isLoginError">Invalid credentials</b-alert>
    <b-alert variant="success" :show="isLoginCorrect">Authorized</b-alert>

  </b-card>

</template>

<script>
import Store from '../store/store'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_name: '',
        password: ''
      },
      show: true,
      isLoginError: false,
      isLoginCorrect: false
    }
  },
  watch: {
    user() {
      const user = Store.state.user
      if (user.id === null) {
        return
      }
      if (user.id > 0) {
        this.isLoginCorrect = true
        // this.$router.push({ name: 'Home' })
        this.$router.go(-1)
      } else {
        this.isLoginError = true
      }
    }
  },
  computed: {
    user() {
      return Store.state.user
    }
  },
  methods: {
    onSubmit(evt) {
      this.isLoginError = false
      evt.preventDefault()
      const payload = {
        user_name: this.form.user_name,
        password: this.form.password
      }
      Store.dispatch('LOGIN', payload)
    },
    onReset(evt) {
      evt.preventDefault()
      this.form.user_name = ''
      this.form.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  created() {
    Store.dispatch('LOGOUT_USER')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loginCard {
  top: 100px;
  margin: 0 auto;
  max-width: 400px;
}
</style>
