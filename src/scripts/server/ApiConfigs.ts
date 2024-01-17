import axios, { AxiosError, AxiosResponse } from "axios";
import Model from "../base/Model";
export const baseUrl: string = 'https://localhost:7062/';
export const root: string = 'api/';
export const HTTP = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: 'Bearer {token}',
        Accept: 'text/plain',
        "Content-Encoding": "charset=utf-8",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});
export const API = {
    
}

export type Constructor<T extends Model> = { new(): T };

export function getUrl<T extends Model>(type: Constructor<T>): string {
    let url: string = '';
    Object.getOwnPropertyNames(API).forEach(pname => {
        if (pname === (type.name) || pname === (type.name + 's')) {
            url = root + API[pname];
            return url;
        }
    });
    return url;
}

export function getAll<T extends Model>(type: Constructor<T>, callback: (data: T[], err?: AxiosError | any) => void, addUrl?: string) {
    let url: string = getUrl(type);
    if (url.length > 0) {
        if (addUrl) url += addUrl;
        HTTP.get(url).then((response: AxiosResponse) => {
            console.log('get all', type.name, 'response on status ', response.status);
            if (response.status === 200) {
                let list: T[] = [];
                response.data.forEach((data: any) => {
                    let obj: T = new type();
                    obj.set(data);
                    list.push(obj);
                });
                callback && callback(list);
            }
        }).catch((err: AxiosError) => { callback && callback(null, err); });
    }
    else {
        callback && callback(null, 'Error on get url');
    }
}

export function get<T extends Model>(type: Constructor<T>, addUrl: string, callback: (data: T, err?: AxiosError | any) => void) {
    let url: string = getUrl(type);
    console.log('get url', url);
    if (url.length > 0) {
        if (addUrl) url += addUrl;
        HTTP.get(url).then((response: AxiosResponse) => {
            console.log('get all', type.name, 'response on status ', response.status);
            if (response.status >= 200 && response.status < 300) {
                let obj: T = new type();
                obj.set(response.data);
                callback && callback(obj);
            }
        }).catch((err: AxiosError) => { callback && callback(null, err); });
    }
    else {
        callback && callback(null, 'Error on get url');
    }
}

export function getByUrl<T extends Model>(type: Constructor<T>, addUrl: string, callback: (data: any, err?: AxiosError | any) => void) {
    let url: string = getUrl(type);
    if (url.length > 0) {
        if (addUrl) url += addUrl;
        HTTP.get(url).then((response: AxiosResponse) => {
            if (response.status === 200) {
                callback && callback(response.data);
            }
        }).catch((err: AxiosError) => { callback && callback(null, err); });
    }
    else {
        callback && callback(null, 'Error on get url');
    }
}

export function post<T extends Model>(type: Constructor<T>, data: T, callback?: (response: AxiosResponse, error?: AxiosError | any) => void) {
    let url: string = getUrl(type);
    if (url.length > 0) {
        console.log('post data', data.get());
        HTTP.post(url, data.get()).then((response: AxiosResponse) => {
            console.log('post', type.name, 'response', response.status);
            if (response.status >= 200 && response.status < 300) {
                callback && callback(response);
            }
            
        }).catch((err: AxiosError) => callback && callback(null, err));
    }
    else {
        callback && callback(null, 'Error on post url');
    }
}
export function put<T extends Model>(type: Constructor<T>, data: T, callback?: (response: AxiosResponse, error?: AxiosError | any) => void) {
    let url: string = getUrl(type);
    if (url.length > 0) {
        console.log('post data', data.get(true));
        HTTP.put(url + data.getId(), data.get(true)).then((response: AxiosResponse) => {
            console.log('post', type.name, 'response', response.status);
            if (response.status >= 200 && response.status < 300) {
                callback && callback(response);
            }
            
        }).catch((err: AxiosError) => callback && callback(null, err));
    }
    else {
        callback && callback(null, 'Error on post url');
    }
}
export function postByUrl<T extends Model>(type: Constructor<T>, addUrl : string, callback?: (response: AxiosResponse, error?: AxiosError | any) => void) {
    let url: string = getUrl(type);
    if (addUrl) url += addUrl;
    if (url.length > 0) {
        HTTP.post(url).then((response: AxiosResponse) => {
            console.log('post', type.name, 'response', response.status);
            if (response.status >= 200 && response.status < 300) {
                callback && callback(response);
            }
        }).catch((err: AxiosError) => callback && callback(null, err));
    }
    else {
        callback && callback(null, 'Error on post url');
    }
}
export function remove<T extends Model>(type: Constructor<T>, data: T, callback?: (response: AxiosResponse, error?: AxiosError | any) => void) {
    let url: string = getUrl(type);
    if (url.length > 0) {
        HTTP.delete(url + data.getId()).then((response: AxiosResponse) => {
            console.log('delete', type.name, 'response', response.status);
            if (response.status >= 200 && response.status < 300) {
                callback && callback(response);
            }
        }).catch((err: AxiosError) => callback && callback(null, err));
    }
    else {
        callback && callback(null, 'Error on post url');
    }
}