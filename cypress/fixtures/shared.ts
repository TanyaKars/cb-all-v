export const sharedLocators = {
    logo: '.text-black',
    navBarItem: '.me-2',
    header: 'h1',
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
    error: '.ant-form-item-explain-error'
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