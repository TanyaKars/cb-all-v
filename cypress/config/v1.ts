import {baseEnvData} from "./_base"

export default {
    baseUrl: 'https://clientbase.us/v1',
    api_url: 'https://clientbase-server.herokuapp.com/v1',
    env: {
        login_api: 'https://clientbase-server.herokuapp.com/v1/user/login',
        ...baseEnvData
    }
}