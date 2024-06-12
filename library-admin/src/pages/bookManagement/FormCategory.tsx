import { Box, Button, Grid, TextField } from '@mui/material';

export const FormCategory = () => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={9}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Tên sách" variant="outlined" />

                    <Button type="button" variant="contained" color="primary">
                        Submit
                    </Button>
                    <Button type="reset" variant="contained" color="secondary">
                        Reset
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};
