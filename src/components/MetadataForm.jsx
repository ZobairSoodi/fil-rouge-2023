import { useState } from "react";
import { StorageService } from "../Shared/Services/storageService";
import { useStorageUpload } from "@thirdweb-dev/react";


function MetadataForm() {
    const [metadata, setMetadata] = useState({
        name: "my first nft",
        description: "my first nft description",
        image: {
            value: "",
            type: "string"
        },
        animation_url: {
            value: "",
            type: "string"
        }
    });
    const { mutateAsync: upload } = useStorageUpload();
    const storage = new StorageService(upload);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setMetadata((current) => { return { ...current, [name]: value } });
    }

    const handleFileChange = (e) => {
        const name = e.target.name;
        setMetadata((current) => { return { ...current, [name]: e.target.files[0] } });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (metadata.name && metadata.description && metadata.image && metadata.animation_url) {
            storage.uploadMetadata(metadata);
            // console.log(metadata);
        }
        else {
            alert("all fields are required")
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-black my-10 text-[35px]">Upload Metadata</h1>
            <form className="flex flex-col gap-8 w-2/3 text-black text-[18px] font-sans">
                <div className="flex items-start">
                    <label className="w-1/3 text-start" htmlFor="name">Name:</label>
                    <input className="w-2/3 py-2 px-3 border-2" id="name" name="name" type="text" placeholder="Name"
                        value={metadata.name} onChange={handleChange}
                    />
                </div>

                <div className="flex items-start">
                    <label className="w-1/3 text-start" htmlFor="description">Description</label>
                    <textarea className="w-2/3 py-2 px-3 h-36 border-2 resize-none" id="description" name="description" placeholder="Description"
                        value={metadata.description} onChange={handleChange}
                    ></textarea>
                </div>

                <div className="flex items-start">
                    <label className="w-1/3 text-start" htmlFor="image">Image</label>
                    <input className="w-2/3" id="image" name="image" type="file"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="flex items-start">
                    <label className="w-1/3 text-start" htmlFor="animation_url">Animation URL</label>
                    <input className="w-2/3" id="animation_url" name="animation_url" type="file"
                        onChange={handleFileChange}
                    />
                </div>

                <div>
                    <button className="text-[#3D3232] font-[Audiowide] text-[18px] bg-[#FFB951] hover:text-[#ffffff] duration-500 py-3 px-5"
                        onClick={handleSubmit}
                    >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default MetadataForm;