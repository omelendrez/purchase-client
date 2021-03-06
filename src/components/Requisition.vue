<template>

  <b-container class="requisition">
    <h3 class="text-center">
      <i class="fas fa-shopping-cart"></i>
      Purchase Requisition {{ this.form.number}}
    </h3>
    <b-card no-body>
      <b-tabs card v-model="tabIndex">
        <b-tab title="Header">
          <b-form @submit="onSubmit" @reset="onReset" v-if="showForm" id="addForm">

            <b-form-group horizontal label="Number" label-for="number">
              <b-form-input id="number" v-model="form.number" readonly></b-form-input>
            </b-form-group>

            <b-form-group horizontal label="Date" label-for="date">
              <b-form-input id="date" type="date" v-model.trim="form.date" :disabled="!this.isEditable"></b-form-input>
            </b-form-group>

            <b-form-group horizontal label="Requester" label-for="full_name">
              <b-form-input id="full_name" v-model="form.full_name" readonly />
            </b-form-group>

            <b-form-group horizontal label="Department" label-for="department_id">
              <b-form-select v-model="form.department_id" :options="departmentOptions" :disabled="!this.isEditable" />
            </b-form-group>

            <b-form-group horizontal label="Project" label-for="project_id">
              <b-form-select v-model="form.project_id" :options="projectOptions" :disabled="!this.isEditable" />
            </b-form-group>

            <b-form-group horizontal label="Delivery location" label-for="location_id">
              <b-form-select v-model="form.location_id" :options="deliveryLocationOptions" :disabled="!this.isEditable" />
            </b-form-group>

            <b-form-group horizontal label="Expected Delivery" label-for="expected_delivery">
              <b-form-input id="expected_delivery" type="date" v-model.trim="form.expected_delivery" :disabled="!this.isEditable"></b-form-input>
            </b-form-group>

            <b-form-group horizontal label="Remarks" label-for="remarks">
              <b-form-textarea id="remarks" v-model="form.remarks" rows="2" :disabled="!this.isEditable"></b-form-textarea>
            </b-form-group>

            <RequestButtons/>

          </b-form>
        </b-tab>

        <b-tab title="Items">
          <b-container>
            <div class="add-button">
              <b-button @click="addItem" variant="primary" title="Add" v-if="this.isEditable">Add item</b-button>
            </div>

            <b-table small hover outlined :items="itemRows" :fields="fields" :show-empty="true" head-variant="light">

              <template slot="description" slot-scope="row">
                <div v-if="!row.item.editing">
                  {{row.item["description"]}}
                </div>
                <b-form-input v-else type="text" v-model="itemForm.description" required></b-form-input>
              </template>

              <template slot="quantity" slot-scope="row">
                <div v-if="!row.item.editing">
                  {{row.item["quantity"]}}
                </div>
                <b-form-input v-else type="number" v-model="itemForm.quantity" required></b-form-input>
              </template>

              <template slot="unit.name" slot-scope="row">
                <div v-if="!row.item.editing">
                  {{row.item["unit.name"]}}
                </div>
                <b-form-select v-model="itemForm.unit_id" :options="unitOptions" v-else required/>
              </template>

              <template slot="actions" slot-scope="row" v-if="isEditable">
                <b-btn size="sm" variant="info" @click.stop="editItem(row.item)" v-if="!row.item.editing" :disabled="isEditing">Edit</b-btn>
                <b-btn size="sm" variant="success" @click.stop="saveItem()" v-else>Save</b-btn>
                <b-btn size="sm" variant="danger" @click.stop="deleteItem(row.item, 1)" v-if="!row.item.editing" :disabled="isEditing">Delete</b-btn>
                <b-btn size="sm" variant="primary" ref="cancelSave" @click.stop="cancelSave(row.item, row.index)" v-else>Cancel</b-btn>
              </template>

            </b-table>

            <b-modal id="modal-center" title="Delete" v-model="deleteShow" @ok="handleOk" ok-title="Yes. Delete" cancel-title="No. Leave it" ok-variant="danger" cancel-variant="success">
              <p class="my-4">Are you sure you want to delete
                <strong>{{ selectedItem.description }} </strong>?</p>
              <p>This action cannot be undone</p>
            </b-modal>

            <b-form @reset="closeTabIndex">
              <ItemsButtons />
            </b-form>

          </b-container>

        </b-tab>

        <b-tab title="Workflow" v-if="canSeeWorkflow">
          <b-form @reset="closeTabIndex">
            <ApprovalButtons v-bind:doc-type="this.docType" />
            <ItemsButtons />
          </b-form>
        </b-tab>

        <b-tab title="Status">
          <b-form @reset="closeTabIndex">
            <DocumentStatus />
            <ItemsButtons />
          </b-form>
        </b-tab>

      </b-tabs>
      <b-container>
        <b-alert variant="danger" dismissible :show="errorShow">{{ errorMessage }}</b-alert>
        <b-alert variant="success" dismissible :show="infoShow">{{ infoMessage }}</b-alert>
      </b-container>
    </b-card>
  </b-container>

</template>

<script>
import Store from '../store/store'
import RequestButtons from './lib/RequestButtons'
import ItemsButtons from './lib/ItemsButtons'
import ApprovalButtons from './lib/ApprovalButtons'
import Add from './lib/Add'
import DocumentStatus from './lib/DocumentStatus'
import { setTimeout } from 'timers'
const fields = require('./lib/Fields').requisitionItems
const actions = require('./lib/Fields').actions

export default {
  name: 'Requisition',
  data() {
    return {
      docType: 'PR',
      tabIndex: 0,
      showForm: true,
      form: {
        id: 0,
        user_id: 0,
        full_name: '',
        number: '',
        date: '',
        department_id: 0,
        remarks: '',
        project_id: 0,
        location_id: 0,
        organization_id: 0,
        workflow_id: 0,
        workflow_status: 0
      },
      itemForm: {
        id: 0,
        description: '',
        requisition_id: 0,
        quantity: 0,
        unit_id: 0
      },
      errorShow: false,
      errorMessage: '',
      infoShow: false,
      infoMessage: '',
      deleteShow: false,
      selectedItem: [],
      deliveryLocationOptions: [],
      departmentOptions: [],
      projectOptions: [],
      unitOptions: [],
      updatingItem: false,
      isEditing: false,
      itemRows: [],
      fields: fields,
      canSeeWorkflow: false
    }
  },
  components: {
    RequestButtons,
    ItemsButtons,
    Add,
    ApprovalButtons,
    DocumentStatus
  },
  watch: {
    activeProjects() {
      this.refreshData(
        Store.state.activeProjects,
        this.projectOptions,
        this.form.organization_id
      )
    },
    activeDepartments() {
      this.refreshData(
        Store.state.activeDepartments,
        this.departmentOptions,
        this.form.organization_id
      )
    },
    activeLocations() {
      this.refreshData(
        Store.state.activeLocations,
        this.deliveryLocationOptions,
        this.form.organization_id
      )
    },
    activeUnits() {
      this.refreshData(Store.state.activeUnits, this.unitOptions, null)
    },
    userWorkflows() {
      const wf = Store.state.userWorkflows.rows
      if (!wf) {
        return
      }
      if (this.item.workflow_id === 0) {
        this.canSeeWorkflow = true
      } else {
        this.canSeeWorkflow = wf.find(item => {
          return item.workflow_id === this.item.workflow_id
        })
      }
    },
    item() {
      this.form.id = this.item.id
      this.form.number = this.item.number
    },
    results() {
      this.isEditing = false
      const results = Store.state.results
      if (results.error) {
        this.errorMessage = results.message
        this.errorShow = results.error
      } else {
        this.infoMessage = 'Database updated successfully'
        this.infoShow = true
        if (this.updatingItem) {
          this.updatingItem = false
        } else {
          this.form.id = results.id
          Store.dispatch('LOAD_UNITS')
          Store.dispatch('ADD_ITEM', results)
        }
        Store.dispatch('LOAD_REQUISITION_ITEMS', this.form.id)
        setTimeout(() => {
          this.infoMessage = ''
          this.infoShow = false
        }, 2000)
      }
    },
    requisitionItems() {
      if (!Store.state.requisitionItems.rows) {
        return
      }
      const items = Store.state.requisitionItems.rows
      const arr = []
      for (let i = 0; i < items.length; i++) {
        let row = {
          editing: false,
          'unit.name': items[i]['unit.name'],
          unit_id: items[i].unit_id,
          description: items[i].description,
          quantity: items[i].quantity,
          id: items[i].id,
          requisition_id: items[i].requisition_id
        }
        arr.push(row)
      }
      this.itemRows = arr
    }
  },
  computed: {
    userWorkflows() {
      return Store.state.userWorkflows
    },
    isEditable() {
      return (
        this.item.workflow_status === 0 ||
        this.item.workflow_status === 3 ||
        this.item.workflow_status === 4
      )
    },
    activeLocations() {
      return Store.state.activeLocations
    },
    activeDepartments() {
      return Store.state.activeDepartments
    },
    activeUnits() {
      return Store.state.activeUnits
    },
    activeProjects() {
      return Store.state.activeProjects
    },
    requisitionItems() {
      return Store.state.requisitionItems
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
    organizationId() {
      return Store.state.user.organization_id
    },
    fullName() {
      return Store.state.user.full_name
    }
  },
  methods: {
    addItem() {
      const item = {
        id: 0,
        unit_id: 0,
        requisition_id: this.item.id,
        quantity: 0,
        description: '',
        editing: true,
        isNew: true
      }
      // this.itemRows.unshift(item);
      this.itemRows.push(item)
      this.isEditing = true
      this.itemForm = item
    },
    saveItem() {
      this.errorMessage = ''
      this.errorShow = false
      this.updatingItem = true
      if (this.itemForm.quantity < 1) {
        this.errorMessage = 'Quantity cannot be lower than 1'
      }
      if (
        !this.itemForm.unit_id ||
        !this.itemForm.quantity ||
        !this.itemForm.description.length
      ) {
        this.errorMessage =
          'You must fill all item fields in oder to be able to save'
      }
      if (this.errorMessage) {
        this.errorShow = true
        return
      }
      Store.dispatch('SAVE_REQUISITION_ITEM', this.itemForm)
    },
    editItem(item) {
      item.editing = true
      this.isEditing = true
      this.itemForm.id = item.id
      this.itemForm.unit_id = item.unit_id
      this.itemForm.description = item.description
      this.itemForm.quantity = item.quantity
      this.itemForm.requisition_id = item.requisition_id
    },

    deleteItem(item, type) {
      this.selectedItem = item
      if (type === 1) {
        this.deleteShow = true
      } else {
        this.handleOk()
      }
    },
    handleOk() {
      this.updatingItem = true
      Store.dispatch('DELETE_REQUISITION_ITEM', this.selectedItem)
    },
    cancelSave(item, index) {
      item.editing = false
      this.isEditing = false
      if (item.isNew) {
        this.itemRows.splice(index, 1)
      }
    },
    onSubmit(evt) {
      evt.preventDefault()
      if (this.isEditable) {
        Store.dispatch('SAVE_REQUISITION', this.form)
      } else {
        this.errorMessage =
          'You are not entitled to modify this document at its current status'
        this.errorShow = true
      }
    },
    onReset(evt) {
      evt.preventDefault()
      /* Trick to reset/clear native browser form validation state */
      Store.dispatch('LOAD_REQUISITIONS')
      this.$nextTick(() => {
        this.$router.go(-1)
      })
    },
    closeTabIndex() {
      this.tabIndex = 0
    },
    refreshData(table, options, organizationId) {
      if (!table.length) {
        return
      }
      for (let i = 0; i < table.length; i++) {
        if (
          table[i].organization_id === organizationId ? organizationId : true
        ) {
          options.push({
            value: table[i].id,
            text: table[i].name
          })
        }
      }
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    Store.dispatch('LOAD_REQUISITION_ITEMS', this.item.id)
    Store.dispatch('LOAD_WORKFLOWS')
    Store.dispatch('LOAD_PROJECTS')
    Store.dispatch('LOAD_LOCATIONS')
    Store.dispatch('LOAD_DEPARTMENTS')
    Store.dispatch('LOAD_UNITS')

    this.form.user_id = this.isLogged
    this.form.number = 'AUTOMATIC'
    this.form.organization_id = this.organizationId
    this.form.full_name = this.fullName
    const now = new Date()
    this.form.date = now.toISOString().substring(0, 10)
    if (this.item.id !== 0) {
      this.form.id = this.item.id
      this.form.user_id = this.item.user_id
      this.form.organization_id = this.item.organization_id
      this.form.full_name = this.item.user.full_name
      this.form.number = this.item.number
      this.form.date = this.item._date
      this.form.location_id = this.item.location_id
      this.form.department_id = this.item.user.department_id
      this.form.project_id = this.item.project_id
      this.form.expected_delivery = this.item._expected_delivery
      this.form.remarks = this.item.remarks
      this.form.workflow_status = this.item.workflow_status
      Store.dispatch('LOAD_USER_WORKFLOWS', this.isLogged)
      const payload = {
        document_type: 1,
        document_id: this.item.id
      }
      Store.dispatch('LOAD_DOCUMENT_STATUS', payload)
    }
    this.fields.push(...actions)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.requisition {
  background-color: white;
  padding: 60px;
  padding-top: 20px;
  margin-top: 18px;
}
#addForm {
  margin: 0 auto;
  max-width: 800px;
}
.add-button {
  margin: 4px;
  margin-bottom: 18px;
}
.to-right {
  float: right;
}
table input[type='number'] {
  max-width: 96px;
  margin: 0 auto;
  text-align: center;
}
</style>
