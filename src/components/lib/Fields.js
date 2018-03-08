"use strict";

const commonFields = [
  {
    label: "Created",
    key: "created_at",
    class: "text-center",
    thStyle: {
      width: "120px"
    }
  },
  {
    label: "Updated",
    key: "updated_at",
    class: "text-center",
    thStyle: {
      width: "120px"
    }
  },
  {
    label: "Status",
    key: "status.name",
    class: "text-center",
    thStyle: {
      width: "100px"
    }
  }
];

const actions = [
  {
    key: "actions",
    class: "text-center",
    thStyle: {
      width: "280px"
    }
  }
];

const org = {
  key: "organization.name",
  label: "Organization",
  sortable: true,
  thStyle: {
    width: "200px"
  }

};

const users = [
  {
    key: "user_name",
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
    sortable: true,
    thStyle: {
      width: "100px"
    }
  },
  {
    key: "name",
    sortable: true
  }
];

const permissions = [
  {
    key: "code",
    sortable: true,
    thStyle: {
      width: "100px"
    }
  },
  {
    key: "name",
    sortable: true,
    thStyle: {
      width: "300px"
    }
  },
  {
    key: "description"
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
  organizations,
  vendors
};
