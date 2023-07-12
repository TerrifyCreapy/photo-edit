import { FC, useEffect } from "react";

interface IImagePage {
    file: File;
}

const ImagePage: FC<IImagePage> = ({ file }) => {
    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            event.preventDefault();
            event.returnValue = ""; // Необязательно, но можно установить пустую строку, чтобы не выводить текст в уведомлении.
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    return (
        <>
            <img
                style={{ maxWidth: "80vw", maxHeight: "80vh" }}
                src={URL.createObjectURL(file)}
                alt=""
            />
        </>
    );
};
export default ImagePage;
