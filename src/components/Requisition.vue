eq<template>

  <b-container class="requisition">
    <h3 class="text-center">
      <i class="fas fa-shopping-cart"></i>
      Purchase Requisition
    </h3>
    <b-card no-body>
      <b-tabs card v-model="tabIndex">
        <b-tab title="Header">
          <b-form @submit="onSubmit" @reset="onReset" v-if="showForm" id="addForm">

            <b-form-group horizontal label="Number" label-for="number">
              <b-form-input id="number" v-model="form.number" readonly v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
            </b-form-group>

            <b-form-group horizontal label="Date" label-for="date">
              <b-form-input id="date" type="date" v-model.trim="form.date" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
            </b-form-group>

            <b-form-group horizontal label="Requester" label-for="full_name">
              <b-form-input id="full_name" v-model="form.full_name" readonly v-bind:style="{ fontSize: fontSize + 'px' }" />
            </b-form-group>

            <b-form-group horizontal label="Department" label-for="department_id">
              <b-form-select v-model="form.department_id" :options="departmentOptions" required v-bind:style="{ fontSize: fontSize + 'px' }" />
            </b-form-group>

            <b-form-group horizontal label="Project" label-for="project_id">
              <b-form-select v-model="form.project_id" :options="projectOptions" required v-bind:style="{ fontSize: fontSize + 'px' }" />
            </b-form-group>

            <b-form-group horizontal label="Delivery location" label-for="location_id">
              <b-form-select v-model="form.location_id" :options="deliveryLocationOptions" required v-bind:style="{ fontSize: fontSize + 'px' }" />
            </b-form-group>

            <b-form-group horizontal label="Expected Delivery" label-for="expected_delivery">
              <b-form-input id="expected_delivery" type="date" v-model.trim="form.expected_delivery" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
            </b-form-group>

            <b-form-group horizontal label="Remarks" label-for="remarks">
              <b-form-textarea id="remarks" v-model="form.remarks" rows="2" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-textarea>
            </b-form-group>

            <RequstButtons/>

          </b-form>
        </b-tab>

        <b-tab title="Items">
          <b-container>
            <div class="add-button">
              <b-button @click="addItem" variant="primary" title="Add">Add item</b-button>
            </div>

            <b-table small hover outlined :items="itemRows" :fields="fields" head-variant="light">

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

              <template slot="actions" slot-scope="row">
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
          <b-container class="action-card">
            <div class="col-md-4 pb-2">
              <b-button class="submit-pr" variant="primary">Submit for approval</b-button>
            </div>
            <div class="col-md-4 pb-2">
              <b-button class="hold-pr" variant="info">Put on-hold</b-button>
            </div>
            <div class="col-md-4 pb-2">
              <b-button class="cancel-pr" variant="danger">Cancel PR</b-button>
            </div>
            <b-form @reset="closeTabIndex">
              <ItemsButtons />
            </b-form>
          </b-container>
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
import Store from "../store/store";
import RequstButtons from "./lib/RequestButtons";
import ItemsButtons from "./lib/ItemsButtons";
import Add from "./lib/Add";
import { setTimeout } from "timers";
const fields = require("./lib/Fields").requisitionItems;
const actions = require("./lib/Fields").actions;

export default {
  date: "Requisition",
  data() {
    return {
      tabIndex: 0,
      showForm: true,
      form: {
        id: 0,
        user_id: 0,
        full_name: "",
        number: "",
        date: "",
        department_id: 0,
        remarks: "",
        project_id: 0,
        location_id: 0,
        organization_id: 0
      },
      itemForm: {
        id: 0,
        description: "",
        requisition_id: 0,
        quantity: 0,
        unit_id: 0
      },
      errorShow: false,
      errorMessage: "",
      infoShow: false,
      infoMessage: "",
      deleteShow: false,
      selectedItem: [],
      deliveryLocationOptions: [],
      departmentOptions: [],
      projectOptions: [],
      unitOptions: [],
      updatingItem: false,
      isEditing: false,
      itemRows: [],
      fields: fields
    };
  },
  components: {
    RequstButtons,
    ItemsButtons,
    Add
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
        Store.dispatch("LOAD_REQUISITION_ITEMS", this.form.id);
        setTimeout(() => {
          this.infoMessage = "";
          this.infoShow = false;
        }, 2000);
      }
    },
    requisitionItems() {
      if (!Store.state.requisitionItems.rows) {
        return;
      }
      const items = Store.state.requisitionItems.rows;
      const arr = [];
      for (let i = 0; i < items.length; i++) {
        let row = {
          editing: false,
          "unit.name": items[i]["unit.name"],
          unit_id: items[i].unit_id,
          description: items[i].description,
          quantity: items[i].quantity,
          id: items[i].id,
          requisition_id: items[i].requisition_id
        };
        arr.push(row);
      }
      this.itemRows = arr;
    }
  },
  computed: {
    fontSize() {
      return Store.state.fontSize;
    },
    locations() {
      const locations = Store.state.activeLocations;
      if (!locations) {
        return;
      }
      const options = [];
      for (let i = 0; i < locations.length; i++) {
        if (
          locations[i].organization_id === Store.state.user.organization_id ||
          Store.state.globalAdmin
        ) {
          options.push({
            value: locations[i].id,
            text: locations[i].name
          });
        }
      }
      return options;
    },
    departments() {
      const departments = Store.state.activeDepartments;
      if (!departments) {
        return;
      }
      const options = [];
      for (let i = 0; i < departments.length; i++) {
        if (
          departments[i].organization_id === Store.state.user.organization_id ||
          Store.state.globalAdmin
        ) {
          options.push({
            value: departments[i].id,
            text: departments[i].name
          });
        }
      }
      return options;
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
    projects() {
      const projects = Store.state.activeProjects;
      if (!projects) {
        return;
      }
      const options = [];
      for (let i = 0; i < projects.length; i++) {
        if (
          projects[i].organization_id === Store.state.user.organization_id ||
          Store.state.globalAdmin
        ) {
          options.push({
            value: projects[i].id,
            text: projects[i].name
          });
        }
      }
      return options;
    },
    requisitionItems() {
      return Store.state.requisitionItems;
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
    }
  },
  methods: {
    addItem() {
      const item = {
        id: 0,
        unit_id: 0,
        requisition_id: this.item.id,
        quantity: 0,
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
      Store.dispatch("SAVE_REQUISITION_ITEM", this.itemForm);
    },
    editItem(item, index, target) {
      item.editing = true;
      this.isEditing = true;
      this.itemForm.id = item.id;
      this.itemForm.unit_id = item.unit_id;
      this.itemForm.description = item.description;
      this.itemForm.quantity = item.quantity;
      this.itemForm.requisition_id = item.requisition_id;
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
      Store.dispatch("DELETE_REQUISITION_ITEM", this.selectedItem);
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
      Store.dispatch("SAVE_REQUISITION", this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Trick to reset/clear native browser form validation state */
      this.$nextTick(() => {
        this.$router.push({ name: "Requisitions" });
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
    Store.dispatch("LOAD_REQUISITION_ITEMS", this.item.id);
    Store.dispatch("LOAD_PROJECTS");
    Store.dispatch("LOAD_LOCATIONS");
    Store.dispatch("LOAD_DEPARTMENTS");
    Store.dispatch("LOAD_UNITS");

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
      this.form.date = this.item._date;
      this.form.location_id = this.item.location_id;
      this.form.department_id = this.item["user.department_id"];
      this.form.project_id = this.item.project_id;
      this.form.expected_delivery = this.item._expected_delivery;
      this.form.remarks = this.item.remarks;
    }
    this.refreshData(
      Store.state.activeLocations,
      this.deliveryLocationOptions,
      this.form.organization_id
    );
    this.refreshData(
      Store.state.activeDepartments,
      this.departmentOptions,
      this.form.organization_id
    );
    this.refreshData(
      Store.state.activeProjects,
      this.projectOptions,
      this.form.organization_id
    );
    this.fields.push(...actions);
  }
};
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
table input[type="number"] {
  max-width: 96px;
  margin: 0 auto;
  text-align: center;
}
</style>
