export const sharedLocators = {
    logo: '.text-black',
    navBarItem: '.me-2',
    header: 'h1',
    drawerHeader: '.ant-drawer-title',
    buttons: {
        login: '[data-qa="login"]',
        register: '[data-qa="register"]',
        primary: '.ant-btn-primary',
    },
    userInfo: {
        dropDown: '[data-qa="userInfoName"]',
        profile: '[data-qa="profile"]',
        settings: '[data-qa="settings"]',
        logout: '[data-qa="logout"]'
    },
    popUp: '.ant-notification-notice-message',
    error: '.ant-form-item-explain-error',
    xButton: '[data-icon="close"]',
    drawerForm: '.ant-form-vertical',
    tableRow: '.ant-table-row',
    tableCell: '.ant-table-cell',
    td: 'td',
    actions: '.actions',
    penIcon: '.edit-pen-icon',
    editDeletTrigger: '.ant-dropdown-trigger',
    editOption: '[data-menu-id$="-edit"]',
    deleteOption: '[data-menu-id$="-delete"]',
    deleteModal: {
        cancelButton: '.ant-btn-default',
        okButton: '.ant-btn-dangerous'
    }
}

export const sharedlabels = {
    logo: 'ClientBase',
    navBar: {
        clients: 'Clients',
        orders: 'Orders',
        Vendors: 'Vendors',
        service: 'Service'
    },
    userInfo: {
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout'
    }
}