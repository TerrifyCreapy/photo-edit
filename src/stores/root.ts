import { makeAutoObservable } from "mobx";
import FileStore from "./FileStore";

export default class RootStore {
    fileStore: FileStore;
    constructor(){
        this.fileStore = new FileStore();
        makeAutoObservable(this);
    }
}