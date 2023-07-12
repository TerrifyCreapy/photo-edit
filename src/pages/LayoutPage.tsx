import { FC } from "react";
import { observer } from "mobx-react-lite";
import MainPage from "./MainPage";
import ImagePage from "./ImagePage";
import useStore from "../hooks/useStore";

const LayoutPage: FC = () => {
    const { fileStore } = useStore();

    function setFile(file: File) {
        fileStore.setFile(file);
    }

    return !fileStore.isUploaded ? (
        <MainPage setFile={setFile} />
    ) : (
        <ImagePage file={fileStore.file} />
    );
};
export default observer(LayoutPage);
