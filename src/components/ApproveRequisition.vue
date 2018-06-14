<template>
  <b-container class="requisition">
    <h3>Purchase Requisition Approval</h3>
    <b-card title="Header">
      <b-form-group horizontal label="Number" label-for="number">
        <b-form-input id="number" v-model="document.number" readonly></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Date" label-for="date">
        <b-form-input id="date" type="date" v-model.trim="document.date" readonly></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Requester" label-for="full_name">
        <b-form-input id="full_name" v-model="document.user.full_name" readonly />
      </b-form-group>
      <b-form-group horizontal label="Department" label-for="department_id">
        <b-form-input id="department_id" v-model="document.department.name" readonly></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Project" label-for="project_id">
        <b-form-input id="project_id" v-model="document.project.name" readonly></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Delivery location" label-for="location_id">
        <b-form-input id="location_id" v-model="document.location.name" readonly></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Expected Delivery" label-for="expected_delivery">
        <b-form-input id="expected_delivery" type="date" v-model.trim="document.expected_delivery" readonly></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Remarks" label-for="remarks">
        <b-form-textarea id="remarks" v-model="document.remarks" rows="2" readonly></b-form-textarea>
      </b-form-group>
    </b-card>

    <b-card title="Items">
      <b-table small striped hover outlined :items="document.requisition_items" :fields="fields" :show-empty="true" head-variant="light">
        <template slot="description" slot-scope="row">
          <div>
            {{row.item["description"]}}
          </div>
        </template>
        <template slot="quantity" slot-scope="row">
          <div>
            {{row.item["quantity"]}}
          </div>
        </template>
        <template slot="unit" slot-scope="row">
          <div>
            {{row.item["unit.name"]}}
          </div>
        </template>
      </b-table>
    </b-card>

    <b-card title="Workflow tracking">
      <DocumentStatus />
    </b-card>

    <b-card title="Approval">
      <b-form>
        <ApprovalButtons v-bind:doc-type="this.docType" />
      </b-form>
    </b-card>
    <div class="buttons">
      <b-button @click="onReset" class="to-right" variant="danger">Close</b-button>
    </div>
  </b-container>

</template>

<script>
import Store from '../store/store'
import ApprovalButtons from './lib/ApprovalButtons'
import Add from './lib/Add'
import DocumentStatus from './lib/DocumentStatus'

const fields = require('./lib/Fields').requisitionItems

export default {
  name: 'ApproveRequisition',
  data() {
    return {
      docType: 'PR',
      fields: fields
    }
  },
  components: {
    Add,
    ApprovalButtons,
    DocumentStatus
  },
  computed: {
    document() {
      return Store.state.document
    }
  },
  methods: {
    onReset(evt) {
      evt.preventDefault()
      this.$nextTick(() => {
        this.$router.go(-1)
      })
    }
  },
  created() {
    const payload = {
      document_type: 1,
      document_id: this.$route.params.id
    }
    Store.dispatch('LOAD_DOCUMENT', payload)
    Store.dispatch('LOAD_DOCUMENT_STATUS', payload)
  }
}
</script>


<style scoped>
.requisition {
  background-color: #fafafa;
  padding: 60px;
  margin-top: 18px;
}
.requisition .card,
.buttons {
  margin-top: 18px;
}
.to-right {
  float: right;
}
table {
  font-size: small;
}
</style>
