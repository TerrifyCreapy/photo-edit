import { FC } from "react";
import { observer } from "mobx-react-lite";
import ImageUpload from "../components/ImageUpload";
import useStore from "../hooks/useStore";
import ImageEditor from "../components/ImageEditor";

const LayoutPage: FC = () => {
    const { fileStore } = useStore();

    function setFile(file: File) {
        fileStore.setFile(file);
    }

    return !fileStore.isUploaded ? (
        <ImageUpload setFile={setFile}/>
    ) : (
        <ImageEditor file={fileStore.file} />
    );
};
export default observer(LayoutPage);
