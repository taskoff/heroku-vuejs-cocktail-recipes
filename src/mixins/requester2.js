
const appKey = 'kid_Bkl7nBaMw';
const appSecret = 'd8bb40c567f34eb1a952bdde98208967';
const rootUrl = 'https://baas.kinvey.com';


const requester = {
    methods: {

        createAuthorization(type) {
            return type === 'Basic'
            ? `Basic ${btoa(`${appKey}:${appSecret}`)}`
            : `Kinvey ${sessionStorage.getItem('authtoken')}`
        },

        makeHeaders(method, data, type) {
            const headers = {
                method: method,
                headers: {
                    'Authorization': this.createAuthorization(type),
                    'content-type': 'application/json'
                }
            }
            if (method === 'POST' || method === 'PUT') {
                headers.body = JSON.stringify(data);
            }
        
            return headers;
        },

        handleError(e) {
            if (!e.ok) {
                alert(e.statusText)
                throw new Error(e.statusText);
            }
            return e;
        },

        serializeData(data) {
            if(data.status === 204){
                return data;
            }
            return data.json();
        },

        fetchData(kinveyModul, endPoint, headers) {
            const url = `${rootUrl}/${kinveyModul}/${appKey}/${endPoint}`;
            return fetch(url, headers)
                // .then(this.handleError)
                // .then(this.serializeData)
        },

        get(kinveyModul, endPoint, type) {
            const headers = this.makeHeaders('GET', type);
            return this.fetchData(kinveyModul, endPoint, headers)
        },
        post(kinveyModul, endPoint, data, type) {
            const headers = this.makeHeaders('POST', data, type);
            return this.fetchData(kinveyModul, endPoint, headers)
        },
        put(kinveyModul, endPoint, data, type) {
            const headers = this.makeHeaders('PUT', data, type);
            return this.fetchData(kinveyModul, endPoint, headers)
        },
        del(kinveyModul, endPoint, type) {
            const headers = this.makeHeaders('DELETE', type);
            return this.fetchData(kinveyModul, endPoint, headers)
        },

        addSessonStorageUserInfo(data) {
            sessionStorage.setItem('authtoken', data._kmd.authtoken);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('userId', data._id);
            sessionStorage.setItem('email', data.email);
        }
    }
}

export default requester;