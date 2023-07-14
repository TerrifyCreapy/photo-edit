import {
    Card,
    Grid,
    Slider,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Link,
} from "@mui/material";
import { FC, useRef, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import ColorsSlider from "../components/ColorsSlider";
import ImageCrop from "../components/ImageCrop";
import ImgDialog from "../components/ImgDialog";

interface IImagePage {
    file: File;
}

const ImagePage: FC<IImagePage> = ({ file }) => {
    const canvasRef = useRef<HTMLCanvasElement>({} as HTMLCanvasElement);
    const [params, setSearchParams] = useSearchParams({ brightness: "true" });
    const [brightness, setBrightness] = useState<number>(100);
    const [rgb, setRgb] = useState<any>({ r: 255, g: 255, b: 255 });

    const [img, setImg] = useState<string|null>(null);

    

    useEffect(() => {
        if(canvasRef.current!==null && canvasRef.current.style) {
            canvasRef.current.style.display = "block";
            canvasRef.current.style.margin = "0 auto";
        }
        
    }, [canvasRef.current]);


    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, [])

    useEffect(() => {
        if (canvasRef.current!== null && canvasRef.current.getContext) {
            const context = canvasRef.current.getContext("2d");
            if (context) {
                const image = new Image();
                image.src = URL.createObjectURL(file);
                image.onload = function (this) {
                    canvasRef.current.width = image.width;
                    canvasRef.current.height = image.height;
                    context.filter = `brightness(${brightness}%)`;
                    context.drawImage(image, 0, 0);

                    context.globalCompositeOperation = "multiply";

                    // Заливка холста желтым цветом
                    context.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
                    context.fillRect(
                        0,
                        0,
                        canvasRef.current.width,
                        canvasRef.current.height,
                    );
                };
            }
        }
    }, [brightness, rgb, canvasRef.current]);

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        123
                    </IconButton>
                    <Button
                        sx={{ color: "black" }}
                        onClick={() => setSearchParams({ brightness: "true" })}
                    >
                        Brightness
                    </Button>
                    <Button
                        sx={{ color: "black" }}
                        onClick={() => setSearchParams({ color: "true" })}
                    >
                        Color
                    </Button>
                    <Button
                        sx={{ color: "black" }}
                        onClick={() => setSearchParams({ crop: "true" })}
                    >
                        Crop
                    </Button>
                </Toolbar>
            </AppBar>
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
                        maxWidth: "80vw",
                        maxHeight: "80vh",
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
                        {!params.get("crop") && <canvas
                            style={{ maxWidth: "100%", maxHeight: "80%" }}
                            ref={canvasRef}
                        ></canvas>}
                        {params.get("crop") && <ImageCrop zoom={zoom} crop={crop} onCropComplete={onCropComplete} setCrop={setCrop} src={URL.createObjectURL(file)}/>}
                        {params.get("color") && (
                            <ColorsSlider
                                rgb={rgb}
                                onChangeB={(value: number) =>
                                    setRgb((e: any) => {
                                        return { ...e, b: value };
                                    })
                                }
                                onChangeR={(value: number) =>
                                    setRgb((e: any) => {
                                        return { ...e, r: value };
                                    })
                                }
                                onChangeG={(value: number) =>
                                    setRgb((e: any) => {
                                        return { ...e, g: value };
                                    })
                                }
                            />
                        )}
                        {params.get("brightness") && (
                            <Slider
                                min={30}
                                max={200}
                                value={brightness}
                                onChange={(e: any) =>
                                    setBrightness(+e.target.value)
                                }
                            />
                        )}
                        
                    </Card>
                    {params.get("crop") && 
                        <>
                            <Slider min={1} max={20} value={zoom} onChange={(e: any) => setZoom(+e.target.value)}/>
                            <ImgDialog croppedAreaPixels={croppedAreaPixels} img={URL.createObjectURL(file)}/>
                        </>
                        
                    }
                </Grid>
            </Grid>
        </>
    );
};
export default ImagePage;
