
export class HttpService {
    async send(method, url, data = {}, headers = {}) {
        const fetchHeaders = new Headers({'Content-Type': 'application/json', ...headers});

        return await fetch(url, {
            method: method,
            headers: fetchHeaders,
            ...(method === 'GET' || method === 'HEAD' ? {} : {body: JSON.stringify(data)})
        }).then(x => x.json()).catch(e => console.error(e));
    }
}