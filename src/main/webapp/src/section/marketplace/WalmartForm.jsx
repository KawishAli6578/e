import { Grid, Button } from "@mui/material";
import FormInput from "components/form-elements/FormInput";
import React from "react";
import { Controller } from "react-hook-form";

const WalmartForm = ({ control }) => {
  return (
    <>
      <form>
        <Grid container spacing={2}>
          {/* Store input field */}
          <Grid item lg={12} md={12}>
            <Controller
              name="walmartStore"
              control={control}
              rules={{ required: "Store name is required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormInput
                  type="text"
                  label="Store Name"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter Store Name"
                  error={error ? error.message : false}
                />
              )}
            />
          </Grid>
          <Grid item lg={6} md={6}>
            <Controller
              name="clientKey"
              control={control}
              rules={{ required: "Client Key is required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormInput
                  type="text"
                  label="Client Key"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter Client Key"
                  error={error ? error.message : false}
                />
              )}
            />
          </Grid>
          <Grid item lg={6} md={6}>
            <Controller
              name="secretKey"
              control={control}
              rules={{ required: "Secret Key is required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormInput
                  type="text"
                  label="Secret Key"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter Secret Key"
                  error={error ? error.message : false}
                />
              )}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default WalmartForm;
