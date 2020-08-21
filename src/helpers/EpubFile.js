'use strict';
import JSZip from 'jszip';

export class EpubFile{

    constructor(){
        this.zip = new JSZip();
        this.reader = new FileReader();
        this.fileName = 'Empty book'
    }

    async load(file) {
        // If file is a File object, convert it into an ArrayBuffer
        if(file instanceof File){
            this.fileName = file.name;
            file = await this.arrayBufferFromFile(file);
        }else{
            this.fileName = 'Unnamed epub';
        }
        this.unzipped = await this.zip.loadAsync(file);
        return this;
    }

    // Promisified reader.onload
    async arrayBufferFromFile(file){
        return new Promise((resolve, reject) => {
            this.reader.readAsArrayBuffer(file);
            this.reader.onload = function (e) {
                resolve(e.target.result);
            };
            this.reader.onerror = reject;
        });
    }

};