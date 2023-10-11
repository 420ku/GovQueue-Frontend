import { useState, useRef } from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { Primary } from "../Buttons";
import { createClient } from "@supabase/supabase-js";

async function uploadFileToSupabase(file) {
    const { VITE_SUPABASE_BUCKET, VITE_SUPABASE_URL, VITE_SUPABASE_KEY } = import.meta.env;

    const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_KEY);

    try {
        const imageName = `${new Date().getTime().toString(32)}_${file.name}`;

        const { data, error } = await supabase.storage
            .from(VITE_SUPABASE_BUCKET)
            .upload(`/register/${imageName}`, file);

        if (error) {
            throw Error(error);
        }

        return `${VITE_SUPABASE_URL}/storage/v1/object/public/${VITE_SUPABASE_BUCKET}/${data.path}`;
    } catch (error) {
        alert("Error on uploading image!");
        console.log(error);
        return null;
    }
}

export default function RegisterUploadLogo({ logo, onChange }) {
    const [currentLogo, setLogo] = useState("https://placehold.co/120x120.png");
    const fileInputRef = useRef(null);

    // Open the select file input
    const handleFileSelect = () => {
        fileInputRef.current.click();
    };

    // Handle the selected file here, e.g., upload it or process it
    const handleFileChange = async (event) => {
        try {
            const selectedFile = event.target.files[0];

            if (selectedFile && selectedFile.type.includes("image") && selectedFile.size <= 50 * 1024 * 1024) {
                const url = await uploadFileToSupabase(selectedFile);

                if (url) {
                    // await handleSaveProfile("logo", url);
                    setLogo(url);
                    onChange(url);
                } else {
                    alert("Something went wrong in upload the image.");
                }
            } else {
                // Handle the case where the selected file is not an image
                alert("Please select a valid image file.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Stack alignItems="center">
                <Tooltip
                    title="Recommended image size is 120x120 pixels and a file size of not more than 50MB."
                    placement="top"
                >
                    <IconButton aria-label="image tip">
                        <img src={currentLogo} style={{ borderRadius: "50%", width: "120px" }} alt="Agency Logo" />
                    </IconButton>
                </Tooltip>
                <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
                <Primary onClick={handleFileSelect} value={"Upload Logo"} sx={{ m: "20px", width: "160px" }} />
            </Stack>
        </>
    );
}
