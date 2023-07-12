import {useContext} from "react";
import { StoreProvider } from "..";

const useStore = () => {
    const rootStore = useContext(StoreProvider);
    return rootStore;
}

export default useStore;