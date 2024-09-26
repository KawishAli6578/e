import { Grid, Button } from "@mui/material";
import FormInput from "components/form-elements/FormInput";
import React from "react";
import { Controller } from "react-hook-form";

const AmazonForm = ({ control }) => {
  return (
    <>
      <form>
        <Grid container spacing={2}>
          {/* Store input field */}
          <Grid item lg={12} md={12}>
            <Controller
              name="amazonStore"
              control={control}
              rules={{ required: "Store name is required" }} // Validation rule
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
                  error={error ? error.message : false} // Show error message
                />
              )}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AmazonForm;
