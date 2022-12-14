import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

export const useAppStyles = makeStyles((theme: Theme) => ({
  app: {
    fontFamily: "sans-serif",
    minWidth: 300,
    maxWidth: 5000,
    margin: 100,
    
  },
  cardContainer: {
    display: "grid",
    gridGap: theme.spacing(2),
  },
}))
