import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

export const useProductsPageStyles = makeStyles((theme: Theme) => ({
  addProductContainer: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gridGap: theme.spacing(2),
    alignItems: "center",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  // cardContent: {
  //   display: "grid",
  // },
  // getLoadingProgress: {
  //   justifySelf: "center",
  // },
  // listItemSecondaryAction: {
  //   display: "grid",
  //   gridTemplateColumns: "1fr 1fr",
  // },
  // updateTextField: {
  //   marginRight: theme.spacing(9),
  // },
  productCard: {
    display: "flex",
    flexDirection: "column"
  },
  
  productCardImg: {
    width: 100,
    height: 'auto',
  }
}))

