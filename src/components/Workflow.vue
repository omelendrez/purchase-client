<template>
  <b-container class="workflow">
    <h3 class="text-center">
      <i class="fas fa-users"></i>
      Workflow {{ this.form.name}}
    </h3>
    <b-card no-body>
      <b-tabs card v-model="tabIndex">
        <b-tab title="Workflow" :title-link-class="['bg-primary', 'text-light', 'mx-2']">

          <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">

            <b-form-group horizontal label="Company" label-for="organization_id">
              <b-form-select v-model="form.organization_id" :options="organizations" />
            </b-form-group>

            <b-form-group horizontal label="Name" label-for="name">
              <b-form-input id="name" v-model.trim="form.name"></b-form-input>
            </b-form-group>

            <b-form-group horizontal label="Description" label-for="description">
              <b-form-input id="description" v-model.trim="form.description"></b-form-input>
            </b-form-group>

            <Buttons/>

          </b-form>
        </b-tab>
        <b-tab title="PRI" :title-link-class="['bg-success', 'text-light', 'mx-2']">
          <h5>PRI - Purchase Request Issuers</h5>
          <b-card>
            <b-form-checkbox-group v-model="selectedPRI" :options="PRI" />
          </b-card>
          <WorkflowButtons v-bind:options="selectedPRI" v-bind:user-type=1 v-bind:workflow-id="this.form.id" />
        </b-tab>
        <b-tab title="PRA" :title-link-class="['bg-success', 'text-light', 'mx-2']">
          <h5>PRA - Purchase Request Approvers</h5>
          <b-card>
            <b-form-checkbox-group v-model="selectedPRA" :options="PRA" />
          </b-card>
          <WorkflowButtons v-bind:options="selectedPRA" v-bind:user-type=2 v-bind:workflow-id="this.form.id" />
        </b-tab>
        <b-tab title="POI" :title-link-class="['bg-danger', 'text-light', 'mx-2']">
          <h5>POI - Purchase Order Issuers</h5>
          <b-card>
            <b-form-checkbox-group v-model="selectedPOI" :options="POI" />
          </b-card>
          <WorkflowButtons v-bind:options="selectedPOI" v-bind:user-type=3 v-bind:workflow-id="this.form.id" />
        </b-tab>
        <b-tab title="POA" :title-link-class="['bg-danger', 'text-light', 'mx-2']">
          <h5>POA - Purchase Order Approvers</h5>
          <b-card>
            <b-form-checkbox-group v-model="selectedPOA" :options="POA" />
          </b-card>
          <WorkflowButtons v-bind:options="selectedPOA" v-bind:user-type=4 v-bind:workflow-id="this.form.id" />
        </b-tab>
        <b-tab title="RRI" :title-link-class="['bg-info', 'text-light', 'mx-2']">
          <h5>RRI - Receiving Report Issuers</h5>
          <b-card>
            <b-form-checkbox-group v-model="selectedRRI" :options="RRI" />
          </b-card>
          <WorkflowButtons v-bind:options="selectedRRI" v-bind:user-type=5 v-bind:workflow-id="this.form.id" />
        </b-tab>
        <b-tab title="RFPI" :title-link-class="['bg-warning', 'text-light', 'mx-2']">
          <h5>RFPI - Request For Payment Issuers</h5>
          <b-card>
            <b-form-checkbox-group v-model="selectedRFPI" :options="RFPI" />
          </b-card>
          <WorkflowButtons v-bind:options="selectedRFPI" v-bind:user-type=6 v-bind:workflow-id="this.form.id" />
        </b-tab>
      </b-tabs>
      <b-container>
        <b-alert variant="danger" :show="errorShow">{{ errorMessage }}</b-alert>
        <b-alert variant="success" :show="infoShow">{{ infoMessage }}</b-alert>
      </b-container>

    </b-card>

  </b-container>
</template>

<script>
import Store from '../store/store'
import Buttons from './lib/Buttons'
import WorkflowButtons from './lib/WorkflowButtons'

export default {
  name: 'Workflow',
  data() {
    return {
      show: true,
      form: {
        id: 0,
        name: '',
        description: '',
        organization_id: 0
      },
      tabIndex: 0,
      errorShow: false,
      errorMessage: '',
      infoShow: false,
      infoMessage: '',
      PRI: [],
      PRA: [],
      POI: [],
      POA: [],
      RRI: [],
      RFPI: [],
      selectedPRI: [],
      selectedPRA: [],
      selectedPOI: [],
      selectedPOA: [],
      selectedRRI: [],
      selectedRFPI: []
    }
  },
  components: {
    Buttons,
    WorkflowButtons
  },
  watch: {
    workflowUsers() {
      const wfUsers = Store.state.workflowUsers.rows
      if (!wfUsers) {
        return
      }
      for (let i = 0; i < wfUsers.length; i++) {
        const item = wfUsers[i]
        switch (item.user_type) {
          case 1: // PRI
            this.selectedPRI.push(item.user_id)
            break
          case 2: // PRA
            this.selectedPRA.push(item.user_id)
            break
          case 3: // POI
            this.selectedPOI.push(item.user_id)
            break
          case 4: // POA
            this.selectedPOA.push(item.user_id)
            break
          case 5: // RRI
            this.selectedRRI.push(item.user_id)
            break
          case 6: // RFPI
            this.selectedRFPI.push(item.user_id)
            break
        }
      }
    },
    messages() {
      this.errorMessage = ''
      this.errorShow = false
      this.infoMessage = ''
      this.infoShow = false
    },
    results() {
      const results = Store.state.results
      if (results.error) {
        this.errorMessage = results.message
        this.errorShow = results.error
      } else {
        this.infoMessage = 'Database updated successfully'
        this.infoShow = true
      }
      setTimeout(() => {
        Store.dispatch('HIDE_MESSAGES')
      }, 2000)
    },
    users() {
      const self = this
      const users = Store.state.activeUsers.filter(user => {
        return user.organization_id === self.form.organization_id
      })
      if (!users) {
        return
      }
      for (let i = 0; i < users.length; i++) {
        const perms = users[i].users_permissions
        for (let j = 0; j < perms.length; j++) {
          const perm = perms[j].permission.code
          this[perm].push({
            value: users[i].id,
            text: `${users[i].full_name} (${users[i].email})`
          })
        }
      }
    }
  },
  computed: {
    workflowUsers() {
      return Store.state.workflowUsers
    },
    messages() {
      return Store.state.messages
    },
    users() {
      return Store.state.activeUsers
    },
    organizations() {
      const organizations = Store.state.activeOrganizations
      if (!organizations) {
        return
      }
      const options = []
      for (let i = 0; i < organizations.length; i++) {
        if (
          organizations[i].id === Store.state.user.organization_id ||
          Store.state.globalAdmin
        ) {
          options.push({
            value: organizations[i].id,
            text: organizations[i].name
          })
        }
      }
      return options
    },
    results() {
      return Store.state.results
    },
    isLogged() {
      return Store.state.user.id
    },
    item() {
      return Store.state.record
    },
    organization_id() {
      return Store.state.user.organization_id
    }
  },
  methods: {
    saveSelected() {},
    undoSelected() {},
    onSubmit(evt) {
      evt.preventDefault()
      Store.dispatch('SAVE_WORKFLOW', this.form)
    },
    onReset(evt) {
      evt.preventDefault()
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.$router.push({ name: 'Workflows' })
      })
    }
  },
  created() {
    Store.dispatch('LOAD_ORGANIZATIONS')
    Store.dispatch('LOAD_USERS')
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    if (this.item) {
      this.form.id = this.item.id
      Store.dispatch('LOAD_WORKFLOW_USERS', this.item.id)
      this.form.name = this.item.name
      this.form.description = this.item.description
      this.form.organization_id = this.item.organization_id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.workflow {
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
