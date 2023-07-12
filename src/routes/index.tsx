import { IBrowserRouter } from "../interfaces/common/IBrowserRouter";
import { main_path } from "../contants/routes";
import LayoutPage from "../pages/LayoutPage";

export const routes: IBrowserRouter[] = [
    {
        path: main_path,
        exact: true,
        element: <LayoutPage />,
    },
];
