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
    key: "description",
    thStyle: {
      width: "auto"
    }
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
    key: "description",
    thStyle: {
      width: "400px"
    }
  },
  {
    key: "quantity",
    class: "text-center"
  },
  {
    key: "unit.name",
    class: "text-center"
  }

]

const units = [
  {
    key: "code",
    sortable: true,
    thStyle: {
      width: "80px"
    }
  },
  {
    key: "name",
    sortable: true
  }
];

const vendors = [
  {
    key: "code",
    sortable: true,
    thStyle: {
      width: "100px"
    }
  },
  {
    key: "name",
    sortable: true
  },
  {
    key: "phone",
    sortable: true
  },
  {
    key: "email",
    sortable: true
  },
  {
    key: "contact",
    sortable: true
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
  organizations,
  vendors,
  units
};
