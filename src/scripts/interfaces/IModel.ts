export default interface IModel<T> {
    set(data : any): T;
    get() : any;
}