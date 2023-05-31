import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { InputLabel, OutlinedInput, Stack } from '@mui/material';

export default function PaymentForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3} mt={2}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="fname">
                            Card Type <span className="err_str">*</span>
                        </InputLabel>
                        <OutlinedInput
                            type="text"
                            placeholder="First Name..."
                            fullWidth
                            size="small"
                        // {...register("name", {
                        //     required: true,
                        //     validate: (value) => { return !!value.trim() }
                        // })}
                        />
                        {/* {errors.name?.type === "required" && (
                            <span style={style}>Field is Required *</span>
                        )}
                        {errors.name?.type === "validate" && (
                            <span style={style}>Name can't be blank *</span>
                        )} */}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="fname">
                            Card Holder Name <span className="err_str">*</span>
                        </InputLabel>
                        <OutlinedInput
                            type="text"
                            placeholder="First Name..."
                            fullWidth
                            size="small"
                        // {...register("name", {
                        //     required: true,
                        //     validate: (value) => { return !!value.trim() }
                        // })}
                        />
                        {/* {errors.name?.type === "required" && (
                            <span style={style}>Field is Required *</span>
                        )}
                        {errors.name?.type === "validate" && (
                            <span style={style}>Name can't be blank *</span>
                        )} */}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                        label="Remember credit card details for next time"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}