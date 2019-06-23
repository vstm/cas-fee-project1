
export class HttpService {
    send(method, url, data = {}, headers = {}) {
        const fetchHeaders = new Headers({'Content-Type': 'application/json', ...headers});

        return fetch(url, {
            method: method,
            headers, fetchHeaders,
            body: JSON.stringify(data)
        }).then(x => x.json()).catch(e => console.error(e));
    }
}