import { makeAutoObservable } from "mobx";

export default class FileStore {
    file: File|null = null;
    isUploaded: boolean = false;
    constructor() {
        makeAutoObservable(this);
    }
    setFile(file: File) {
        this.file = file;
        this.setUploaded(true);
    }
    setUploaded(bool: boolean) {
        this.isUploaded = bool;
    }
}