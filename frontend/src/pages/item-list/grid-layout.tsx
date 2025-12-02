
import { memo, useEffect, useState } from "react";
import { Box, Card, CardContent, CardHeader, Grid, Stack, Typography } from "@mui/material";
import SouthIcon from '@mui/icons-material/South';
import StraightIcon from '@mui/icons-material/Straight';
import { isMobile } from "react-device-detect";

export const GridViewRender = memo((props: { data: Record<string, any>[] }) => {
    const { data } = props;
        const [isClientMobile, setIsClientMobile] = useState(false);
    
        useEffect(() => {
            // This runs only on client side
            setIsClientMobile(isMobile);
        }, []);
    return (
        <Grid container columns={isClientMobile?1:3} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
            {data.map((info) => (
                <Grid size={1}>
                    <Card>
                        <CardHeader title={info.name} subheader={info.category} sx={{ paddingBottom: '0px' }} />
                        <CardContent>
                            <Stack direction="row" justifyContent={'space-between'}>
                                <Box>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <span>Cost:</span>
                                        <SouthIcon sx={{ color: 'red' }} />
                                    </Stack>
                                    <span>₹{info.cost}1127895</span>
                                </Box>
                                <Box>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <span>Price:</span>
                                        <StraightIcon sx={{ color: 'green' }} />
                                    </Stack>
                                    <span>₹{info.price}1127895</span>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
})
