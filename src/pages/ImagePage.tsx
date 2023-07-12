import { FC, useRef, useEffect, useState } from "react";

interface IImagePage {
    file: File;
}

const ImagePage: FC<IImagePage> = ({ file }) => {
    const ref = useRef<HTMLCanvasElement>({} as HTMLCanvasElement);
    const [brightness, setBrightness] = useState<number>(50);

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
            image.onload = () => {
                ref.current.width = image.width;
                ref.current.height = image.height;
                context.filter = `brightness(${brightness}%)`;
                context.drawImage(image, 0, 0);
            };
            ref.current.onclick = function (event: any) {
                console.log(
                    event.x,
                    event.y,
                    ref.current.offsetWidth,
                    ref.current.offsetHeight,
                );
                context?.beginPath();
                const x =
                        (ref.current.width / ref.current.offsetWidth) * event.x,
                    y =
                        (ref.current.height / ref.current.offsetHeight) *
                        event.y;
                context?.arc(x, y, 50, 0, Math.PI * 2);
                context?.stroke();
            };
        }

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [brightness, file]);

    return (
        <>
            <canvas
                ref={ref}
                style={{ maxWidth: "75vw", maxHeight: "75vh" }}
            ></canvas>
            <input
                type="range"
                min={0}
                max={200}
                value={brightness}
                onChange={(e: any) => {
                    setBrightness(e.target.value);
                }}
            />
        </>
    );
};
export default ImagePage;
