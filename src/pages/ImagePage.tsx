import { Button, Card, Grid, Slider, Typography } from "@mui/material";
import { FC, useRef, useEffect, useState } from "react";

interface IImagePage {
    file: File;
}

const ImagePage: FC<IImagePage> = ({ file }) => {
    const ref = useRef<HTMLCanvasElement>({} as HTMLCanvasElement);
    const [brightness, setBrightness] = useState<number>(100);
    const [rgba, setRGBA] = useState<{
        r: number;
        g: number;
        b: number;
        a: number;
    }>({ r: 255, g: 255, b: 255, a: 100 });

    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            event.preventDefault();
            event.returnValue = ""; // Необязательно, но можно установить пустую строку, чтобы не выводить текст в уведомлении.
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        const context = ref.current?.getContext("2d");
        if (context) {
            const image = new Image();
            image.src = URL.createObjectURL(file);
            image.image.onload = () => {
                ref.current.width = image.width;
                ref.current.height = image.height;
                context.filter = `brightness(${brightness}%)`;
                context.drawImage(image, 0, 0);
                context.globalCompositeOperation = "multiply";
                context.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${
                    rgba.a / 100
                })`;
                context.fillRect(0, 0, ref.current.width, ref.current.height);
            };
        }

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [file, brightness, rgba]);

    function addBrightness(value: number) {
        if (brightness > 200) return;
        setBrightness(brightness + value);
    }

    function removeBrightness(value: number) {
        if (brightness < 15) return;
        setBrightness(brightness - value);
    }

    function onChangeR(event: any) {
        console.log(event.target.value);
        setRGBA((value) => {
            return { ...value, r: +event.target.value };
        });
    }

    function onChangeG(event: any) {
        setRGBA((value) => {
            return { ...value, g: +event?.target?.value };
        });
    }

    function onChangeB(event: any) {
        setRGBA((value) => {
            return { ...value, b: +event?.target?.value };
        });
    }

    function onChangeA(event: any) {
        setRGBA((value) => {
            return { ...value, a: +event.target.value };
        });
    }

    return (
        <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            sx={{
                width: "100vw",
                height: "100vh",
            }}
        >
            <Grid
                item
                sx={{
                    maxWidth: "50vw",
                    maxHeight: "60vh",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Card
                    sx={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        padding: 2,
                    }}
                >
                    <canvas
                        ref={ref}
                        style={{
                            maxWidth: "75%",
                            maxHeight: "75%",
                            position: "absolute",
                            top: 0,
                            right: 0,
                        }}
                    ></canvas>
                    <Typography component="div">
                        <Button onClick={() => addBrightness(5)}>
                            + 5 brightness
                        </Button>
                        <Button onClick={() => removeBrightness(5)}>
                            - 5 brightness
                        </Button>
                    </Typography>
                    <Typography component="div" maxWidth={"30%"}>
                        <Slider
                            aria-label="Red"
                            value={rgba.r}
                            onChange={onChangeR}
                            min={0}
                            max={255}
                        />
                        <Slider
                            aria-label="Green"
                            value={rgba.g}
                            onChange={onChangeG}
                            min={0}
                            max={255}
                        />
                        <Slider
                            aria-label="Blue"
                            value={rgba.b}
                            onChange={onChangeB}
                            min={0}
                            max={255}
                        />
                        <Slider
                            aria-label="Alpha"
                            value={rgba.a}
                            onChange={onChangeA}
                            min={0}
                            max={100}
                        />
                    </Typography>
                </Card>
            </Grid>
        </Grid>
    );
};
export default ImagePage;
