import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  paper: {
    padding: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  background: {
    backgroundColor: "yellow",
    height: "100vh",
    position: "absolute",
    zIndex: -1,
    width: "100%",
  },
  adminForm: {
    padding: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  adminContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
  },
  orderForm: {
    width: "50%",
    padding: theme.spacing(4),
    flex: 1,
  },
  orderFormStack: {
    width: "80%",
    margin: "0 auto",
  },
  imagesSection: {
    minWidth: "20rem",
    padding: theme.spacing(4),
  },
  imagesButton: {
    alignItems: "center",
  },
}));

export default useStyles;
