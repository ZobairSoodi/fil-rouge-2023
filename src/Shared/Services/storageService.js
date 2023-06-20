import { Metadata } from "../Classes/classes";

async function readFile(path) {
    if (path.constructor.name !== "File") {
        const res = await fetch(path);
        const blobData = await res.blob();
        // eslint-disable-next-line
        const image = path.replace(/^.*[\\\/]/, '');

        const file = new File([blobData], image);
        return file;
    }

    return path;
}

export class StorageService {

    constructor(upload) {
        this.upload = upload;
    }

    async uploadImage(image) {
        const fileImage = await readFile(image);
        console.log(fileImage);
        const res = await this.upload({ data: [fileImage] });
        console.log(" res is", res);
        return {
            full_url: res[0],
            path: res[0].split(":/")[1]
        };
    }


    async uploadMetadata(metadata) {
        const image = await this.uploadImage(metadata.image);
        metadata.image = image.full_url;
        let data = new Metadata(metadata);

        const res = this.upload({
            data: [data],
        })
        console.log("resposne:", res);

    }
}