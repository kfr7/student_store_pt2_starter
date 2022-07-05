import axios from "axios"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null 
    }

    setToken(token) {
        this.token = token
        localStorage.setItem("student_store_token", token)
    }

    async request({endpoint, method="GET", data={}}) {
        const wholeUrl = `${this.remoteHostUrl}/${endpoint}`
        const headers = {
            "Content-Type": "application/json"
        }
        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }
        try {
            const res = await axios({ "url": wholeUrl, method, data, headers })
            return {data: res.data, error: null}
        }
        catch (error) {
            console.error({ errorResponse: error.response })
            const message = error?.response?.data?.error?.message
            return {data: null, error: message || String(error)}
        }

    }

    async login(credentials)
    {
        return await this.request({ endpoint: "auth/login", method: 'POST', data: credentials } )
    }

    async signup(credentials)
    {
        return await this.request({ endpoint: "auth/register", method: 'POST', data: credentials } )
    }

    async fetchUserFromToken() {
        return await this.request( { endpoint: 'auth/me', method: 'GET' })
    }

    async fetchProducts() {
        return await this.request( { endpoint: 'store', method: 'GET' } )
    }
    async createOrder(order) {
        return await this.request({ endpoint: "order/", method: 'POST', data: order})
    }

}

export default new ApiClient(process.env.REMOTE_HOST_URL || "http://localhost:3001")
