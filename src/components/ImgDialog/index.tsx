import { Button, Grid } from '@mui/material';
import {FC, useEffect, useRef} from 'react'
import { Close } from '@mui/icons-material';

interface IImgDialog {
    croppedAreaPixels: {width: number, height: number, x: number, y: number};
    img: any;
    onClose: () => unknown;
}

const ImgDialog: FC<IImgDialog> = ({croppedAreaPixels, img, onClose}) => {
    const canvasRef = useRef<HTMLCanvasElement>({} as HTMLCanvasElement);
    console.log(croppedAreaPixels)
    useEffect(() => {
        if(canvasRef.current !== null){
            const context = canvasRef.current.getContext("2d");
            if(context) {
                const image= new Image();
                image.src = img;
                image.onload = function() {
                    if(canvasRef.current !== null){
                        canvasRef.current.width = croppedAreaPixels.width;
                        canvasRef.current.height = croppedAreaPixels.height;
                        context.drawImage(image, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height, 0, 0, canvasRef.current.width, canvasRef.current.height);
                    }
                    
                }
            }
        }   
    }, [croppedAreaPixels])

    return(
        <Grid 
            container 
            position="absolute"
            sx={{top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 10,backgroundColor: "rgba(0,0,0,.3)"}}
            spacing={0}
            alignItems="center"
            justifyContent="center"
            onClick={onClose}
        >
            <Grid item sx={{}}>
                <canvas ref={canvasRef} onClick={onClose}></canvas>
            </Grid>       
        </Grid>
        
    )
}

export default ImgDialog;