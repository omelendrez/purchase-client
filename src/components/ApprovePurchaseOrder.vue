<template>
  <b-container class="purchase-order">
    <h3>Purchase Order Approval</h3>
    <b-card title="Header">
      <b-form-group horizontal label="Number" label-for="number">
        <b-form-input id="number" v-model="document.number" readonly></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Vendor" label-for="vendor_id">
        <b-form-input id="vendor_id" v-model="document.vendor.name" readonly></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Date" label-for="date">
        <b-form-input id="date" type="date" v-model.trim="document.date" readonly></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Requester" label-for="full_name">
        <b-form-input id="full_name" v-model="document.user.full_name" readonly />
      </b-form-group>
      <b-form-group horizontal label="Delivery location" label-for="location_id">
        <b-form-input id="location_id" v-model="document.location.name" readonly></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Expected Delivery" label-for="expected_delivery">
        <b-form-input id="expected_delivery" type="date" v-model.trim="document.expected_delivery" readonly></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="instructions" label-for="instructions">
        <b-form-textarea id="instructions" v-model="document.instructions" rows="2" readonly></b-form-textarea>
      </b-form-group>
      <b-form-group horizontal label="Payment terms" label-for="payment_terms">
        <b-form-textarea id="payment_terms" v-model="document.payment_terms" rows="2" readonly></b-form-textarea>
      </b-form-group>
      <b-form-group horizontal label="Total order" label-for="total_amount">
        <b-form-input id="total_amount" v-model="total_amount" readonly></b-form-input>
      </b-form-group>
    </b-card>

    <b-card title="Items">
      <b-table small striped hover outlined :items="document.purchase_order_items" :fields="fields" :show-empty="true" head-variant="light">
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
        <template slot="unit_price" slot-scope="row">
          <div>
            {{formatAmount(row.item["unit_price"])}}
          </div>
        </template>
        <template slot="total_amount" slot-scope="row">
          <div>
            {{formatAmount(row.item["total_amount"])}}
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
/* eslint-disable */
import Store from '../store/store'
import ApprovalButtons from './lib/ApprovalButtons'
import Add from './lib/Add'
import DocumentStatus from './lib/DocumentStatus'

const fields = require('./lib/Fields').purchaseOrderItems

export default {
  name: 'ApprovePurchaseOrder',
  data() {
    return {
      docType: 'PO',
      itemRows: [],
      fields: fields,
      total_amount: 0
    }
  },
  components: {
    Add,
    ApprovalButtons,
    DocumentStatus
  },
  watch: {
    document() {
      this.total_amount = this.formatAmount(this.document.total_amount)
    }
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
    },
    formatAmount(amount) {
      return amount.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }
  },
  created() {
    const payload = {
      document_type: 2,
      document_id: this.$route.params.id
    }
    Store.dispatch('LOAD_DOCUMENT', payload)
    Store.dispatch('LOAD_DOCUMENT_STATUS', payload)
  }
}
</script>

<style scoped>
.purchase-order {
  background-color: #fafafa;
  padding: 60px;
  margin-top: 18px;
}
.purchase-order .card,
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
