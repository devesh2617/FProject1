import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Paper, Stack } from "@mui/material";
import useStyles from "../styles";

interface OrderDetails {
  name: string;
  code: string;
  orderDate: any;
  deliveryDate: any;
  type: string;
  typeOfMould: string;
  pattern: string;
  neelDesign: string;
  sideDesign: string;
  soleDesign: string;
  size: number | null;
  plateDrawingAndSize: string;
  nakkaFitting: string;
  expansion: string;
  notes: string;
  images: FileList | null;
}
export default function AddressForm() {
  const classes = useStyles();
  const [images, setImages] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [orderDetails, setOrderDetails] = React.useState<OrderDetails>({
    name: "",
    code: "",
    orderDate: null,
    deliveryDate: null,
    type: "",
    typeOfMould: "",
    pattern: "",
    neelDesign: "",
    sideDesign: "",
    soleDesign: "",
    size: null,
    plateDrawingAndSize: "",
    nakkaFitting: "",
    expansion: "",
    notes: "",
    images: null,
  });
  const handleImageSelect = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImagesSelect = (e: any) => {
    setOrderDetails((prev: any) => ({
      ...prev,
      images: e.target.files,
    }));
    const ImagesArray = Array.from(e?.target?.files)?.map((file: any) =>
      URL.createObjectURL(file)
    );
    setImages(ImagesArray || []);
  };

  return (
    <React.Fragment>
      <Stack direction="row" spacing={4} className={classes.orderFormStack}>
        <Paper elevation={4} className={classes.orderForm}>
          <Typography variant="h5" gutterBottom>
            Order Details
          </Typography>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="name"
                  label="Name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="code"
                  label="Code"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="orderDate"
                  label="Order Date"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="deliveryDate"
                  label="Delivery Date"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="type"
                  label="Type"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="typeOfMould"
                  label="Type of Mould"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="pattern"
                  label="Pattern"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="neelDesign"
                  label="Neel Design"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="sideDesign"
                  label="Side Design"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="soleDesign"
                  label="Sole Design"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="size"
                  type="number"
                  label="Size"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="plateDrawingAndSize"
                  label="Plate Drawing and Size"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="nakkaAndFitting"
                  label="Nakka + Fitting"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="expansion"
                  label="Expansion"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="notes"
                  label="Notes"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  multiline
                  minRows={2}
                  maxRows={2}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: "1rem" }}
            >
              Submit
            </Button>
          </form>
        </Paper>
        <Paper elevation={4} className={classes.imagesSection}>
          <Stack direction="row" spacing={2} mb={2}>
            <Typography
              variant="h5"
              className={classes.imagesButton}
              gutterBottom
            >
              Upload Images
            </Typography>
            <Button variant="contained" onClick={handleImageSelect}>
              +
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              multiple
              onChange={handleImagesSelect}
            ></input>
          </Stack>
          <Stack direction="column" gap={2}>
            {images?.map((image: string, index: number) => {
              return (
                <img
                  key={index}
                  src={image}
                  style={{
                    width: "15rem",
                    height: "12srem",
                  }}
                />
              );
            })}
          </Stack>
        </Paper>
      </Stack>
    </React.Fragment>
  );
}
