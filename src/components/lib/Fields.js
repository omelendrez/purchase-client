'use strict'

const commonFields = [
  {
    label: 'Created',
    key: 'created_at',
    class: 'text-center text-nowrap'
  },
  {
    label: 'Updated',
    key: 'updated_at',
    class: 'text-center text-nowrap'
  },
  {
    label: 'Status',
    key: 'status.name',
    class: 'text-center'
  }
]

const actions = [
  {
    key: 'actions',
    label: ' ',
    class: 'text-right text-nowrap'
  }
]

const org = {
  key: 'organization.code',
  label: 'Coy',
  thStyle: {
    width: '32px'
  }
}

const users = [
  {
    key: 'user_name',
    sortable: true
  },
  {
    key: 'full_name',
    sortable: true
  },
  {
    key: 'email',
    sortable: true
  },
  {
    label: 'Profile',
    key: 'profile.name',
    sortable: true
  },
  {
    label: 'Department',
    key: 'department.name',
    sortable: true
  }
]

const departments = [
  {
    key: 'name',
    sortable: true
  }
]

const locations = [
  {
    key: 'name',
    sortable: true
  },
  {
    key: 'address'
  }
]

const projects = [
  {
    key: 'code',
    sortable: true
  },
  {
    key: 'name',
    sortable: true
  }
]

const permissions = [
  {
    key: 'code',
    sortable: true
  },
  {
    key: 'name',
    sortable: true,
    class: 'text-nowrap'
  },
  {
    key: 'description'
  },
  {
    key: 'order',
    class: 'text-center'
  }
]

const requisitions = [
  {
    key: 'number',
    class: 'text-center',
    sortable: true
  },
  {
    key: 'date',
    class: 'text-center text-nowrap'
  },
  {
    key: 'user.full_name',
    label: 'Requester',
    sortable: true
  },
  {
    key: 'department.name',
    label: 'Department',
    sortable: true
  },
  {
    key: 'project.name',
    label: 'Project',
    sortable: true
  },
  {
    key: 'expected_delivery',
    class: 'text-center text-nowrap'
  },
  {
    key: 'workflow_status_name',
    label: 'Workflow Status',
    class: 'text-center'
  }
]

const requisitionItems = [
  {
    key: 'description'
  },
  {
    key: 'quantity',
    class: 'text-center'
  },
  {
    key: 'unit.name',
    class: 'text-center'
  }
]

const purchaseOrders = [
  {
    key: 'number',
    class: 'text-center'
  },
  {
    key: 'date',
    class: 'text-center text-nowrap'
  },
  {
    key: 'user.full_name',
    label: 'Requester'
  },
  {
    key: 'expected_delivery',
    class: 'text-center text-nowrap'
  },
  {
    key: 'total_amount',
    label: 'Total order',
    class: 'text-right'
  },
  {
    key: 'workflow_status_name',
    label: 'Workflow Status',
    class: 'text-center'
  }
]

const purchaseOrderItems = [
  {
    key: 'description'
  },
  {
    key: 'unit.name',
    label: 'UoM',
    class: 'text-center'
  },
  {
    key: 'quantity',
    label: 'Qty',
    class: 'text-center'
  },
  {
    key: 'unit_price',
    class: 'text-right'
  },
  {
    key: 'total_amount',
    class: 'text-right'
  }
]

const workflows = [
  {
    key: 'name',
    sortable: true
  },
  {
    key: 'description'
  }
]

const workflowSteps = [
  {
    key: 'description'
  },
  {
    key: 'unit.name',
    label: 'UoM',
    class: 'text-center'
  },
  {
    key: 'quantity',
    label: 'Qty',
    class: 'text-center'
  },
  {
    key: 'unit_price',
    class: 'text-right'
  },
  {
    key: 'total_amount',
    class: 'text-right'
  }
]

const units = [
  {
    key: 'code',
    sortable: true
  },
  {
    key: 'name',
    sortable: true
  }
]

const vendors = [
  {
    key: 'code',
    sortable: true
  },
  {
    key: 'name',
    sortable: true
  },
  {
    key: 'phone'
  },
  {
    key: 'email'
  },
  {
    key: 'contact'
  },
  {
    key: 'remarks'
  }
]

const organizations = [
  {
    key: 'code',
    sortable: true
  },
  {
    key: 'name',
    sortable: true
  }

]

const documentStatus = [
  {
    key: 'document_status_name',
    label: 'Status',
    class: 'text-nowrap'
  },
  {
    key: 'user.full_name',
    label: 'User',
    class: 'text-nowrap'
  },
  {
    key: 'remarks'
  },
  {
    label: 'Executed',
    key: 'created_at',
    class: 'text-center text-nowrap'
  }
]

module.exports = {
  commonFields,
  actions,
  org,
  users,
  departments,
  documentStatus,
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
}
