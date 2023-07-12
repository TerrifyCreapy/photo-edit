import { FC, useId, useState, DragEvent } from "react";
import { Card, FormGroup, Grid, Input, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

interface IMainPage {
    setFile: (file: File) => void;
}

const MainPage: FC<IMainPage> = ({ setFile }) => {
    const inputId = useId();
    const [drag, setDrag] = useState<boolean>(false);

    function onDrag(e: DragEvent<HTMLLabelElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (
            e.type.toLowerCase() === "dragenter" ||
            e.type.toLowerCase() === "dragover"
        ) {
            setDrag(true);
        } else {
            setDrag(false);
        }
    }

    function onDrop(e: DragEvent<HTMLLabelElement>) {
        e.preventDefault();
        if (
            e.dataTransfer.files.length !== 1 ||
            !e.dataTransfer.files[0].type.startsWith("image")
        )
            return;
        console.log(e.dataTransfer.files[0]);
        setDrag(false);
        setFile(e.dataTransfer.files[0]);
    }

    return (
        <Grid
            container
            spacing={0}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
            height={"100%"}
        >
            <Grid item>
                <Card
                    sx={{
                        border: "3px dashed rgba(0,0,0,.2)",
                        minWidth: "350px",
                        color: drag ? "blue" : "black",
                        ":hover": {
                            borderColor: "rgba(0,0,0,1)",
                            color: "blue",
                            cursor: "pointer",
                        },
                    }}
                >
                    <FormGroup sx={{ cursor: "pointer" }}>
                        <Typography
                            component="label"
                            htmlFor={inputId}
                            textAlign="center"
                            onDragEnter={onDrag}
                            onDragOver={onDrag}
                            onDragLeave={onDrag}
                            onDrop={onDrop}
                            sx={{ cursor: "pointer", padding: 10 }}
                        >
                            <Typography sx={{ pointerEvents: "none" }}>
                                {drag
                                    ? "Drop file here"
                                    : "Drop file here or click"}
                            </Typography>
                            <Typography
                                textAlign="center"
                                sx={{ pointerEvents: "none" }}
                            >
                                <CloudUpload />
                            </Typography>
                            <Input
                                type="file"
                                id={inputId}
                                sx={{ display: "none" }}
                            />
                        </Typography>
                    </FormGroup>
                </Card>
            </Grid>
        </Grid>
    );
};

export default MainPage;
