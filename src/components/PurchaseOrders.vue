<template>
  <b-container class="purchase_orders" fluid>

    <Add />

    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Type here for a quick search" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>

    <b-table small hover outlined :items="purchaseOrders.rows" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage" :show-empty="true" head-variant="light">
      <template slot="actions" slot-scope="row">
        <b-btn size="sm" variant="outline-dark" @click.stop="row.toggleDetails" v-bind:style="{ fontSize: fontSize + 'px' }">{{ row.detailsShowing ? 'Hide' : 'Show'}}</b-btn>
        <b-btn size="sm" variant="info" @click.stop="editItem(row.item)" v-bind:style="{ fontSize: fontSize + 'px' }">Modify</b-btn>
        <b-btn size="sm" v-if="row.item.status_id === 1" variant="danger" @click.stop="deleteItem(row.item, 1)" v-bind:style="{ fontSize: fontSize + 'px' }">Inactivate</b-btn>
        <b-btn size="sm" v-else variant="success" @click.stop="deleteItem(row.item, 0)" v-bind:style="{ fontSize: fontSize + 'px' }">Re-activate</b-btn>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card class="card-data">
          <b-row>
            <b-col colspan="2">
              <b-button size="sm" variant="outline-dark" class="float-right" @click="row.toggleDetails">Hide Details</b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-sm-right">
              <b>Number:</b>
            </b-col>
            <b-col cols="8">
              {{ row.item["number"] }}
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-sm-right">
              <b>Requester:</b>
            </b-col>
            <b-col cols="8">
              {{ row.item["user.full_name"] }}
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-sm-right">
              <b>Date:</b>
            </b-col>
            <b-col cols="8">
              {{ row.item["date"] }}
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-sm-right">
              <b>Instructions:</b>
            </b-col>
            <b-col cols="8">
              {{ row.item["instructions"] }}
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-sm-right">
              <b>Payment terms:</b>
            </b-col>
            <b-col cols="8">
              {{ row.item["payment_terms"] }}
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-sm-right">
              <b>Delivery location:</b>
            </b-col>
            <b-col cols="8">
              {{ row.item["location.name"] }}
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-sm-right">
              <b>Delivery scheduled:</b>
            </b-col>
            <b-col cols="8">
              {{ row.item["expected_delivery"] }}
            </b-col>
          </b-row>
        </b-card>
      </template>

      <template slot="table-caption">
        {{purchaseOrders.count}} registros
      </template>
    </b-table>

    <b-pagination :total-rows="purchaseOrders.count" :per-page="perPage" v-model="currentPage" variant="info" />

    <b-modal id="modal-center" title="Inactivate" v-model="deleteShow" @ok="handleOk" ok-title="Yes. Inactivate" cancel-title="No. Leave it Active" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Are you sure you want to inactivate
        <strong>{{ selectedItem.number }} </strong>?</p>
    </b-modal>
  </b-container>
</template>

<script>
import Store from "../store/store";
import Add from "./lib/Add";
const fields = require("./lib/Fields").purchaseOrders;
const commonFields = require("./lib/Fields").commonFields;
const actions = require("./lib/Fields").actions;
const org = require("./lib/Fields").org;

export default {
  name: "PurchaseOrders",
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      deleteShow: false,
      selectedItem: {
        name: ""
      },
      fields: fields
    };
  },
  methods: {
    editItem(item) {
      Store.dispatch("ADD_ITEM", item);
      this.$router.push({ name: "PurchaseOrder" });
    },
    deleteItem(item, type) {
      this.selectedItem = item;
      if (type === 1) {
        this.deleteShow = true;
      } else {
        this.handleOk();
      }
    },
    handleOk() {
      Store.dispatch("DELETE_PURCHASE_ORDER", this.selectedItem);
    }
  },
  watch: {
    results() {
      const results = Store.state.results;
      if (results.error) {
        return;
      }
      Store.dispatch("LOAD_PURCHASE_ORDERS");
    }
  },
  computed: {
    fontSize() {
      return Store.state.fontSize;
    },
    results() {
      return Store.state.results;
    },
    isLogged() {
      return Store.state.user.id;
    },
    purchaseOrders() {
      return Store.state.purchaseOrders;
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("SET_MENU_OPTION", this.$route.name);
    Store.dispatch("LOAD_LOCATIONS");
    Store.dispatch("LOAD_VENDORS");
    Store.dispatch("LOAD_PURCHASE_ORDERS");
    if (Store.state.globalAdmin) {
      this.fields.unshift(org);
    }
    this.fields.push(...commonFields);
    this.fields.push(...actions);
  },
  components: {
    Add
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.purchase_orders {
  background-color: white;
  padding-bottom: 20px;
  padding-top: 20px;
}
.add-button {
  float: right;
}
.filter-form {
  max-width: 30%;
  margin-bottom: 20px;
}
.reset-button {
  margin-left: 10px;
}
.card-data {
  max-width: 800px;
}

</style>
