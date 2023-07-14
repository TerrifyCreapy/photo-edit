import {FC, useEffect, useRef} from 'react'

interface IImgDialog {
    croppedAreaPixels: {width: number, height: number, x: number, y: number};
    img: any;
}

const ImgDialog: FC<IImgDialog> = ({croppedAreaPixels, img}) => {
    const canvasRef = useRef<HTMLCanvasElement>({} as HTMLCanvasElement);
    console.log(croppedAreaPixels)
    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        if(context) {
            const image= new Image();
            image.src = img;
            image.onload = function() {
                canvasRef.current.width = croppedAreaPixels.width;
                canvasRef.current.height = croppedAreaPixels.height;
                context.drawImage(image, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height, 0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        }
    }, [croppedAreaPixels])

    return(
        <>
            <canvas ref={canvasRef}></canvas>
        </>
        
    )
}

export default ImgDialog;