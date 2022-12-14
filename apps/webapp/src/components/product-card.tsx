import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import { Rating } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Product } from "@ventionsubmission/models"

import { LoadingIconButton } from "../loading-icon-button/loading-icon-button"
// initialize props type
type ProductCardProps = {
  product: Product
  onAddToCart: (product: Product) => void
  onRemoveFromCart: (product: Product) => void
  onChangeRating: (product: Product, rating: number) => void
  AddingLoading: boolean
  RemovingLoading: boolean
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <Card sx={{ maxWidth: 500, backgroundColor: "black" }} variant="outlined">
      <CardMedia component="img" height="300" image={props.product.img} alt={props.product.text} />
      <CardContent>
        <Typography variant="h5" component="div" align="center" sx={{ color: "white" }}>
          {props.product.text}
        </Typography>
      </CardContent>

      <Box margin={1} textAlign="center">
        {!props.product.inCart && (
          <LoadingIconButton Icon={AddShoppingCartIcon} loading={props.AddingLoading} onClick={() => props.onAddToCart(props.product)}>
            Add to Shopping Cart
          </LoadingIconButton>
        )}
        {props.product.inCart && (
          <Button variant={"contained"} color={"error"} sx={{ margin: 1 }} onClick={() => props.onRemoveFromCart(props.product)}>
            Remove From Cart
          </Button>
        )}
      </Box>
      <Box margin={1} textAlign="center">
        <Rating
          name="simple-controlled"
          value={props.product.rating}
          onChange={(_, newValue) => {
            newValue ? props.onChangeRating(props.product, newValue) : null
          }}
          // make sure star border is white, and is visible against black background
          emptyIcon={<StarBorderIcon fontSize="inherit" sx={{ color: "white" }} />}
        />
      </Box>
    </Card>
  )
}
