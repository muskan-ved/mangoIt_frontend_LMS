import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';

export default function AddressForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <Grid container spacing={3} mt={2}>
                <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="fname">
                            First Name <span className="err_str">*</span>
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
                <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="lname">
                            Last Name <span className="err_str">*</span>
                        </InputLabel>
                        <OutlinedInput
                            type="text"
                            id="name"
                            placeholder="Last Name..."
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
                <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="email">
                            Email  <span className="err_str">*</span>
                        </InputLabel>
                        <OutlinedInput
                            type="text"
                            placeholder="Email..."
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
                <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="number">
                            Number <span className="err_str">*</span>
                        </InputLabel>
                        <OutlinedInput
                            type="text"
                            placeholder="Number..."
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
                    <Stack spacing={1}>
                        <InputLabel htmlFor="add1">
                            Address Line 1 <span className="err_str">*</span>
                        </InputLabel>
                        <OutlinedInput
                            type="text"
                            placeholder="Address 1..."
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
                    <Stack spacing={1}>
                        <InputLabel htmlFor="add2">
                            Address Line 2
                        </InputLabel>
                        <OutlinedInput
                            type="text"
                            placeholder="Address 2..."
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
                <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="city">
                            City  <span className="err_str">*</span>
                        </InputLabel>
                        <OutlinedInput
                            type="text"
                            placeholder="City..."
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
                <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="state">
                            State/Province/Region <span className="err_str">*</span>
                        </InputLabel>
                        <OutlinedInput
                            type="text"
                            placeholder="State..."
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
                <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="name">
                            Zip / Postal code <span className="err_str">*</span>
                        </InputLabel>
                        <OutlinedInput
                            type="text"
                            id="name"
                            placeholder="Postal Code..."
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
                <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="country">
                            Country <span className="err_str">*</span>
                        </InputLabel>
                        <OutlinedInput
                            type="text"
                            id="name"
                            placeholder="Country..."
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
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}