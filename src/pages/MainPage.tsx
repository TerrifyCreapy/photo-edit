import { FC } from "react";
import { Card, FormGroup, Grid } from "@mui/material";

const MainPage: FC = () => {
    return(
        <Grid
            container
            spacing={0}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
            height={"100%"}
            >
            <Grid
                item
            >
                <Card
                >
                    <FormGroup sx={{padding: 2}}>
                        123
                    </FormGroup>
                </Card>
            </Grid>
        </Grid>
        
    );
}

export default MainPage;