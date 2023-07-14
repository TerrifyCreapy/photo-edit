import { Slider } from "@mui/material";
import { FC } from "react";

interface IColorsSlider {
    rgb: { r: number; g: number; b: number };
    onChangeR: (value: number) => unknown;
    onChangeG: (value: number) => unknown;
    onChangeB: (value: number) => unknown;
}

const ColorsSlider: FC<IColorsSlider> = ({
    rgb,
    onChangeB,
    onChangeG,
    onChangeR,
}) => {
    return (
        <>
            <Slider
                max={255}
                min={0}
                value={rgb.r}
                onChange={(event: any) => onChangeR(+event.target.value)}
            />
            <Slider
                max={255}
                min={0}
                value={rgb.g}
                onChange={(event: any) => onChangeG(+event.target.value)}
            />
            <Slider
                max={255}
                min={0}
                value={rgb.b}
                onChange={(event: any) => onChangeB(+event.target.value)}
            />
        </>
    );
};
export default ColorsSlider;
