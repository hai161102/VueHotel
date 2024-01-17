import IModel from "../interfaces/IModel";

export default abstract class Model implements IModel<Model> {
    abstract getId() : number | string;
    set(data: any): Model {
        Object.getOwnPropertyNames(this).forEach(prop => {
            if (data.hasOwnProperty(prop)) {
                this[prop] = data[prop];
            }
        });
        this.loadedData();
        return this;
    }
    get(hasId: boolean = false): any {
        let data = {};
        if(hasId) {
            Object.getOwnPropertyNames(this).forEach(prop => {
                Object.defineProperty(data, prop, { value: this[prop], enumerable: true });
            });
            Object.create(data);
            return data;
        }
        Object.getOwnPropertyNames(this).forEach(prop => {
            if (prop !== 'id') {
                Object.defineProperty(data, prop, { value: this[prop], enumerable: true });
            }
        });
        Object.create(data);
        return data;
    }

    protected loadedData() {}
}