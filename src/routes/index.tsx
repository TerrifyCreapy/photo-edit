import { IBrowserRouter } from "../interfaces/common/IBrowserRouter";
import { main_path } from "../contants/routes";
import MainPage from "../pages/MainPage";

export const routes:IBrowserRouter[] = [
    {
        path: main_path,
        exact: true,
        element: <MainPage/>
    },
]