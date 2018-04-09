<template>
  <b-container class="organization">
    <h3 class="text-center">
      <i class="fas fa-building"></i>
      Company {{ this.form.name}}
    </h3>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">

      <b-form-group horizontal label="Code" label-for="code">
        <b-form-input id="code" v-model.trim="form.code"></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Name" label-for="name">
        <b-form-input id="name" v-model.trim="form.name"></b-form-input>
      </b-form-group>

      <Buttons/>

      <b-alert variant="danger" :show="errorShow">{{ errorMessage }}</b-alert>

    </b-form>
  </b-container>
</template>

<script>
import Store from '../store/store'
import Buttons from './lib/Buttons'

export default {
  name: 'Organization',
  data() {
    return {
      show: true,
      form: {
        code: '',
        name: '',
        id: 0
      },
      errorShow: false,
      errorMessage: ''
    }
  },
  components: {
    Buttons
  },
  watch: {
    results() {
      const results = Store.state.results
      if (results.error) {
        this.errorMessage = results.message
        this.errorShow = results.error
        return
      }
      this.$router.push({ name: 'Organizations' })
    }
  },
  computed: {
    results() {
      return Store.state.results
    },
    isLogged() {
      return Store.state.user.id
    },
    item() {
      return Store.state.record
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      Store.dispatch('SAVE_ORGANIZATION', this.form)
    },
    onReset(evt) {
      evt.preventDefault()
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.$router.push({ name: 'Organizations' })
      })
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    if (this.item) {
      this.form.code = this.item.code
      this.form.name = this.item.name
      this.form.id = this.item.id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.organization {
  background-color: white;
  padding: 60px;
  margin-top: 18px;
}
#addForm {
  margin: 0 auto;
  max-width: 800px;
  padding-top: 40px;
}
</style>
