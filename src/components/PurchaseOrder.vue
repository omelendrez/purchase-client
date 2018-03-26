<template>

  <b-container class="purchase_order">
    <h3 class="text-center">
      <i class="fas fa-shopping-cart"></i>
      Purchase Order {{ this.form.number}}
    </h3>
    <b-card no-body>
      <b-tabs card v-model="tabIndex">
        <b-tab title="Header">
          <b-form @submit="onSubmit" @reset="onReset" v-if="showForm" id="addForm">

            <b-form-group horizontal label="Number" label-for="number">
              <b-form-input id="number" v-model="form.number" readonly v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
            </b-form-group>

            <b-form-group horizontal label="Vendor" label-for="vendor_id">
              <b-form-select v-model="form.vendor_id" :options="vendorOptions" :disabled="!this.isEditable" required v-bind:style="{ fontSize: fontSize + 'px' }" />
            </b-form-group>

            <b-form-group horizontal label="Date" label-for="date">
              <b-form-input id="date" type="date" v-model.trim="form.date" :disabled="!this.isEditable" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
            </b-form-group>

            <b-form-group horizontal label="Requester" label-for="full_name">
              <b-form-input id="full_name" v-model="form.full_name" readonly v-bind:style="{ fontSize: fontSize + 'px' }" />
            </b-form-group>

            <b-form-group horizontal label="Delivery location" label-for="location_id">
              <b-form-select v-model="form.location_id" :options="deliveryLocationOptions" :disabled="!this.isEditable" required v-bind:style="{ fontSize: fontSize + 'px' }" />
            </b-form-group>

            <b-form-group horizontal label="Expected Delivery" label-for="expected_delivery">
              <b-form-input id="expected_delivery" type="date" v-model.trim="form.expected_delivery" :disabled="!this.isEditable" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
            </b-form-group>

            <b-form-group horizontal label="Instructions" label-for="instructions">
              <b-form-textarea id="instructions" v-model="form.instructions" rows="2" :disabled="!this.isEditable" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-textarea>
            </b-form-group>

            <b-form-group horizontal label="Payment terms" label-for="payment_terms">
              <b-form-textarea id="payment_terms" v-model="form.payment_terms" rows="2" :disabled="!this.isEditable" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-textarea>
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
                <b-form-select v-model="itemForm.unit_id" :options="units" v-else required/>
              </template>

              <template slot="unit_price" slot-scope="row">
                <div v-if="!row.item.editing">
                  {{row.item["unit_price"]}}
                </div>
                <b-form-input v-else type="number" v-model="itemForm.unit_price" required></b-form-input>
              </template>

              <template slot="total_amount" slot-scope="row">
                {{row.item["total_amount"]}}
              </template>

              <template slot="actions" slot-scope="row" v-if="this.isEditable">
                <b-btn size="sm" variant="info" @click.stop="editItem(row.item, row.index, $event.target)" v-if="!row.item.editing" :disabled="isEditing">Edit</b-btn>
                <b-btn size="sm" variant="success" @click.stop="saveItem(row.item, row.index, $event.target)" v-else>Save</b-btn>
                <b-btn size="sm" variant="danger" @click.stop="deleteItem(row.item, 1)" v-if="!row.item.editing" :disabled="isEditing">Delete</b-btn>
                <b-btn size="sm" variant="primary" ref="cancelSave" @click.stop="cancelSave(row.item, row.index, $event.target)" v-else>Cancel</b-btn>
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

        <b-tab title="Workflow">
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
import Store from "../store/store";
import RequestButtons from "./lib/RequestButtons";
import ItemsButtons from "./lib/ItemsButtons";
import ApprovalButtons from "./lib/ApprovalButtons";
import Add from "./lib/Add";
import DocumentStatus from "./lib/DocumentStatus";
import { setTimeout } from "timers";
const fields = require("./lib/Fields").purchaseOrderItems;
const actions = require("./lib/Fields").actions;

export default {
  name: "PurchaseOrder",
  data() {
    return {
      docType: "PO",
      tabIndex: 0,
      showForm: true,
      form: {
        id: 0,
        user_id: 0,
        vendor_id: 0,
        full_name: "",
        number: "",
        date: "",
        instructions: "",
        payment_terms: "",
        location_id: 0,
        organization_id: 0
      },
      itemForm: {
        id: 0,
        description: "",
        purchase_order_id: 0,
        quantity: 0,
        unit_id: 0,
        unit_price: 0,
        total_amount: 0
      },
      errorShow: false,
      errorMessage: "",
      infoShow: false,
      infoMessage: "",
      deleteShow: false,
      selectedItem: [],
      deliveryLocationOptions: [],
      vendorOptions: [],
      updatingItem: false,
      isEditing: false,
      itemRows: [],
      fields: fields
    };
  },
  components: {
    RequestButtons,
    ItemsButtons,
    Add,
    ApprovalButtons,
    DocumentStatus
  },
  watch: {
    results() {
      this.isEditing = false;
      const results = Store.state.results;
      if (results.error) {
        this.errorMessage = results.message;
        this.errorShow = results.error;
      } else {
        this.infoMessage = "Database updated successfully";
        this.infoShow = true;
        if (this.updatingItem) {
          this.updatingItem = false;
        } else {
          this.form.id = results.id;
          Store.dispatch("LOAD_UNITS");
          Store.dispatch("ADD_ITEM", results);
        }
        Store.dispatch("LOAD_PURCHASE_ORDER_ITEMS", this.form.id);
        setTimeout(() => {
          this.infoMessage = "";
          this.infoShow = false;
        }, 2000);
      }
    },
    purchaseOrderItems() {
      if (!Store.state.purchaseOrderItems.rows) {
        return;
      }
      const items = Store.state.purchaseOrderItems.rows;
      const arr = [];
      for (let i = 0; i < items.length; i++) {
        let row = {
          editing: false,
          "unit.name": items[i]["unit.name"],
          unit_id: items[i].unit_id,
          description: items[i].description,
          quantity: items[i].quantity,
          id: items[i].id,
          unit_price: items[i].unit_price.toLocaleString("en-US", {
            minimumFractionDigits: 2
          }),
          total_amount: items[i].total_amount.toLocaleString("en-US", {
            minimumFractionDigits: 2
          }),
          purchase_order_id: items[i].purchase_order_id
        };
        arr.push(row);
      }
      this.itemRows = arr;
    },
    activeLocations() {
      this.refreshData(
        Store.state.activeLocations,
        this.deliveryLocationOptions,
        this.form.organization_id
      );
    },
    activeVendors() {
      this.refreshData(
        Store.state.activeVendors,
        this.vendorOptions,
        this.form.organization_id
      );
    }
  },
  computed: {
    isEditable() {
      return this.form.workflow_status === 0;
    },
    fontSize() {
      return Store.state.fontSize;
    },
    units() {
      const units = Store.state.activeUnits;
      if (!units) {
        return;
      }
      const options = [];
      for (let i = 0; i < units.length; i++) {
        options.push({
          value: units[i].id,
          text: units[i].name
        });
      }
      return options;
    },
    purchaseOrderItems() {
      return Store.state.purchaseOrderItems;
    },
    results() {
      return Store.state.results;
    },
    isLogged() {
      return Store.state.user.id;
    },
    item() {
      return Store.state.record;
    },
    organizationId() {
      return Store.state.user.organization_id;
    },
    fullName() {
      return Store.state.user.full_name;
    },
    activeLocations() {
      return Store.state.activeLocations;
    },
    activeVendors() {
      return Store.state.activeVendors;
    }
  },
  methods: {
    addItem() {
      const item = {
        id: 0,
        unit_id: 0,
        purchase_order_id: this.item.id,
        quantity: 0,
        unit_price: 0,
        description: "",
        editing: true,
        isNew: true
      };
      // this.itemRows.unshift(item);
      this.itemRows.push(item);
      this.isEditing = true;
      this.itemForm = item;
    },
    saveItem(item, index, target) {
      this.errorMessage = "";
      this.errorShow = false;
      this.updatingItem = true;
      if (this.itemForm.quantity < 1) {
        this.errorMessage = "Quantity cannot be lower than 1";
      }
      if (
        !this.itemForm.unit_id ||
        !this.itemForm.quantity ||
        !this.itemForm.description.length
      ) {
        this.errorMessage =
          "You must fill all item fields in oder to be able to save";
      }
      if (this.errorMessage) {
        this.errorShow = true;
        return;
      }
      Store.dispatch("SAVE_PURCHASE_ORDER_ITEM", this.itemForm);
    },
    editItem(item, index, target) {
      item.editing = true;
      this.isEditing = true;
      this.itemForm.id = item.id;
      this.itemForm.unit_id = item.unit_id;
      this.itemForm.description = item.description;
      this.itemForm.quantity = item.quantity;
      this.itemForm.purchase_order_id = item.purchase_order_id;
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
      this.updatingItem = true;
      Store.dispatch("DELETE_PURCHASE_ORDER_ITEM", this.selectedItem);
    },
    cancelSave(item, index, target) {
      item.editing = false;
      this.isEditing = false;
      if (item.isNew) {
        this.itemRows.splice(index, 1);
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      if (this.isEditable) {
        Store.dispatch("SAVE_PURCHASE_ORDER", this.form);
      } else {
        this.errorMessage =
          "You are not entitled to modify this document at its current status";
        this.errorShow = true;
      }
    },
    onReset(evt) {
      evt.preventDefault();
      /* Trick to reset/clear native browser form validation state */
      this.$nextTick(() => {
        this.$router.push({ name: "PurchaseOrders" });
      });
    },
    closeTabIndex() {
      this.tabIndex = 0;
    },
    refreshData(table, options, organizationId) {
      if (!table.length) {
        return;
      }
      for (let i = 0; i < table.length; i++) {
        if (table[i].organization_id === organizationId) {
          options.push({
            value: table[i].id,
            text: table[i].name
          });
        }
      }
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("LOAD_VENDORS");
    Store.dispatch("LOAD_LOCATIONS");
    Store.dispatch("LOAD_UNITS");
    Store.dispatch("LOAD_PURCHASE_ORDER_ITEMS", this.item.id);

    this.form.user_id = this.isLogged;
    this.form.number = "AUTOMATIC";
    this.form.organization_id = this.organizationId;
    this.form.full_name = this.fullName;
    const now = new Date();
    this.form.date = now.toISOString().substring(0, 10);
    if (this.item.id !== 0) {
      this.form.id = this.item.id;
      this.form.user_id = this.item["user.id"];
      this.form.organization_id = this.item.organization_id;
      this.form.full_name = this.item["user.full_name"];
      this.form.number = this.item.number;
      this.form.vendor_id = this.item.vendor_id;
      this.form.date = this.item._date;
      this.form.location_id = this.item.location_id;
      this.form.expected_delivery = this.item._expected_delivery;
      this.form.instructions = this.item.instructions;
      this.form.payment_terms = this.item.payment_terms;
      const payload = {
        document_type: 2,
        document_id: this.item.id
      };
      Store.dispatch("LOAD_DOCUMENT_STATUS", payload);
    }
    this.fields.push(...actions);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.purchase_order {
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
table input[type="number"] {
  max-width: 96px;
  margin: 0 auto;
  text-align: center;
}
</style>
