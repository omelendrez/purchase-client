"use strict";

const commonFields = [
  {
    label: "Created",
    key: "created_at",
    class: "text-center text-nowrap"
  },
  {
    label: "Updated",
    key: "updated_at",
    class: "text-center text-nowrap"
  },
  {
    label: "Status",
    key: "status.name",
    class: "text-center"
  }
];

const actions = [
  {
    key: "actions",
    label: " ",
    class: "text-right text-nowrap"
  }
];

const org = {
  key: "organization.name",
  label: "Company"
};

const users = [
  {
    key: "user_name",
    sortable: true
  },
  {
    key: "full_name",
    sortable: true
  },
  {
    key: "email",
    sortable: true
  },
  {
    label: "Profile",
    key: "profile.name",
    sortable: true
  },
  {
    label: "Department",
    key: "department.name",
    sortable: true
  }
];

const departments = [
  {
    key: "name",
    sortable: true
  }
];

const locations = [
  {
    key: "name",
    sortable: true
  },
  {
    key: "address"
  }
];

const projects = [
  {
    key: "code",
    sortable: true
  },
  {
    key: "name",
    sortable: true
  }
];

const permissions = [
  {
    key: "code",
    sortable: true
  },
  {
    key: "name",
    sortable: true,
    class: "text-nowrap"
  },
  {
    key: "description"
  },
  {
    key: "order",
    class: "text-center"
  }
];

const requisitions = [
  {
    key: "number",
    class: "text-center",
    sortable: true
  },
  {
    key: "date",
    class: "text-center text-nowrap"
  },
  {
    key: "user.full_name",
    label: "Requester",
    sortable: true
  },
  {
    key: "department.name",
    label: "Department",
    sortable: true
  },
  {
    key: "project.name",
    label: "Project",
    sortable: true
  },
  {
    key: "expected_delivery",
    class: "text-center text-nowrap"
  }
];

const requisitionItems = [
  {
    key: "description"
  },
  {
    key: "quantity",
    class: "text-center"
  },
  {
    key: "unit.name",
    class: "text-center"
  }
];

const purchaseOrders = [
  {
    key: "number",
    class: "text-center",
    sortable: true
  },
  {
    key: "date",
    class: "text-center text-nowrap"
  },
  {
    key: "user.full_name",
    label: "Requester",
    sortable: true
  },
  {
    key: "expected_delivery",
    class: "text-center text-nowrap"
  }
];

const purchaseOrderItems = [
  {
    key: "description"
  },
  {
    key: "unit.name",
    label: "UoM",
    class: "text-center"
  },
  {
    key: "quantity",
    label: "Qty",
    class: "text-center"
  },
  {
    key: "unit_price",
    class: "text-right"
  },
  {
    key: "total_amount",
    class: "text-right"
  }
];

const workflows = [
  {
    key: "name",
    sortable: true
  },
  {
    key: "description"
  }
];

const workflowSteps = [
  {
    key: "description"
  },
  {
    key: "unit.name",
    label: "UoM",
    class: "text-center"
  },
  {
    key: "quantity",
    label: "Qty",
    class: "text-center"
  },
  {
    key: "unit_price",
    class: "text-right"
  },
  {
    key: "total_amount",
    class: "text-right"
  }
];

const units = [
  {
    key: "code",
    sortable: true
  },
  {
    key: "name",
    sortable: true
  }
];

const vendors = [
  {
    key: "code",
    sortable: true
  },
  {
    key: "name",
    sortable: true
  },
  {
    key: "phone"
  },
  {
    key: "email"
  },
  {
    key: "contact"
  }
];

const organizations = [
  {
    key: "name",
    sortable: true
  }
];

module.exports = {
  commonFields,
  actions,
  org,
  users,
  departments,
  locations,
  projects,
  permissions,
  requisitions,
  requisitionItems,
  purchaseOrders,
  purchaseOrderItems,
  organizations,
  vendors,
  workflows,
  workflowSteps,
  units
};
