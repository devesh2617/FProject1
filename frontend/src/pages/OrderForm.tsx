import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Paper, Stack } from "@mui/material";
import useStyles from "../styles";
import formatObjectValues from "../utils/formatObjectValues";
import { postApi } from "../api/axios";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setOrderDetails((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = formatObjectValues(orderDetails);

    postApi("order/create-order", body).then((res: any) => {
      console.log(res);
    });
  };

  const handleImagesSelect = (e: any) => {
    const formData = new FormData();
    formData.append("images", e.target.files);
    postApi("order/upload-order-images", formData);
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
          <form onSubmit={handleOrderSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="name"
                  label="Name"
                  value={orderDetails.name}
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="code"
                  label="Code"
                  value={orderDetails.code}
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Order Date"
                    sx={{ width: "100%" }}
                    value={orderDetails.orderDate}
                    onChange={(newValue) => {
                      setOrderDetails((prev: any) => ({
                        ...prev,
                        orderDate: newValue,
                      }));
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Delivery Date"
                    sx={{ width: "100%" }}
                    value={orderDetails.deliveryDate}
                    onChange={(newValue) => {
                      setOrderDetails((prev: any) => ({
                        ...prev,
                        deliveryDate: newValue,
                      }));
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="type"
                  label="Type"
                  value={orderDetails.type}
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="typeOfMould"
                  label="Type of Mould"
                  value={orderDetails.typeOfMould}
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="pattern"
                  label="Pattern"
                  value={orderDetails.pattern}
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="neelDesign"
                  label="Neel Design"
                  value={orderDetails.neelDesign}
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="sideDesign"
                  label="Side Design"
                  value={orderDetails.sideDesign}
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="soleDesign"
                  label="Sole Design"
                  value={orderDetails.soleDesign}
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="size"
                  type="number"
                  label="Size"
                  value={orderDetails.size}
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="plateDrawingAndSize"
                  label="Plate Drawing and Size"
                  value={orderDetails.plateDrawingAndSize}
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="nakkaFitting"
                  label="Nakka + Fitting"
                  value={orderDetails.nakkaFitting}
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="expansion"
                  label="Expansion"
                  value={orderDetails.expansion}
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="notes"
                  label="Notes"
                  value={orderDetails.notes}
                  fullWidth
                  variant="outlined"
                  multiline
                  minRows={2}
                  maxRows={2}
                  onChange={handleChange}
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
          <Stack direction="column" gap={2} sx={{ alignItems: "center" }}>
            {images?.map((image: string, index: number) => {
              return (
                <img
                  key={index}
                  src={image}
                  style={{
                    width: "12rem",
                    height: "10rem",
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
