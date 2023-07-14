import {FC, useState, useCallback} from "react";
import Cropper from "react-easy-crop";

interface IImageCrop {
    src: any,
    zoom: any,
    crop: any,
    setCrop: any,
    onCropComplete: any,
}

const ImageCrop: FC<IImageCrop> = ({src, zoom, crop, setCrop, onCropComplete}) => {
    
    return (
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={3/2}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
        />
    );
}

export default ImageCrop;