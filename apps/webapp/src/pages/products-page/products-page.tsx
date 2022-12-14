import { Add, Delete, Done, Edit } from "@mui/icons-material"
import { Card, CardContent, CircularProgress, List, ListItem, ListItemSecondaryAction, ListItemText, TextField } from "@mui/material"
import { Grid } from "@mui/material"
import { Product } from "@ventionsubmission/models"
import React, { ChangeEvent, useEffect, useState } from "react"
import productsList from "./products-list"
import ProductCard from "../../components/ProductCard"
import ProductCardv2 from "../../components/ProductCardv2"
import { LoadingIconButton } from "../../loading-icon-button/loading-icon-button"
import {
  useCreateOneProductMutation,
  useDeleteOneProductMutation,
  useGetManyProductsQuery,
  useUpdateOneProductMutation,
} from "../../redux/endpoints/products-endpoints"
import { useProductsPageStyles } from "./products-page.styles"
import Box from "@mui/material"

interface Props {}

export const ProductsPage: React.FC<Props> = () => {
  const classes = useProductsPageStyles()
  const { data, isLoading: isGetAllProductsLoading } = useGetManyProductsQuery({ sort: ["id,DESC"] })
  const products = (data as unknown as Product[]) || []
  const [isAdding, setIsAdding] = useState(false)
  const [createProduct, { isLoading: isCreatingProduct }] = useCreateOneProductMutation()
  const [updateProduct, { isLoading: isUpdatingProduct }] = useUpdateOneProductMutation()
  const [deleteProduct, { isLoading: isDeletingProduct }] = useDeleteOneProductMutation()
  const [updateProductRating, { isLoading: isUpdatingProductRating }] = useUpdateOneProductMutation()
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const [productCreateText, setProductCreateText] = useState("")
  const [productCreateImgUrl, setProductCreateImgUrl] = useState("")
  const [productEditTextMap, setProductEditTextMap] = useState(new Map<number, string>())
  const [productRatingMap, setProductRatingMap] = useState(new Map<number, number>())
  const [productEditIdMap, setProductEditIdMap] = useState(new Map<number, boolean>())

  
  useEffect(() => {
    if (!isGetAllProductsLoading){
      if(products.length == 0) {
        productsList.forEach(async (product) => {
          await createProduct({ product })
        })
      }
    }
    
  }, [products])

  const onAddToCart = async (product: Product) => {
    setSelectedProduct(product)
    await updateProduct({ id: product.id, product : { text: product.text, img: product.img, inCart: true } })
  }

  const onRemoveFromCart = async (product: Product) => {
    setSelectedProduct(product)
    await updateProduct({ id: product.id, product : { text: product.text, img: product.img, inCart: false } })
  }


  const dummyAddCart = (product: Product) => {
   console.log('add to cart')
  }

  const onChangeRating = async (product: Product, newRating) => {
    await updateProductRating({ id: product.id, product : { text: product.text, img: product.img, rating: newRating, inCart : product.inCart } })
  }
  const onProductCreateChange = (event: ChangeEvent<HTMLInputElement>) => setProductCreateText(event.target.value)

  const onProductUpdateChange = (product: Product) => (event: ChangeEvent<HTMLInputElement>) => {
    return setProductEditTextMap({ ...productEditTextMap, [product.id]: event.target.value })
  }

  // const onProductCreate = async () => {
  //   const response = await createProduct({ product: { text: productCreateText, img: "hhhhh", inCart: true } })
  //   if ("data" in response) {
  //     setProductCreateText("")
  //   }
  // }

  const onProductEditClick = async (product: Product) => {
    setSelectedProduct(product)
    if (productEditIdMap[product.id]) {
      await updateProduct({ id: product.id, product: { text: productEditTextMap[product.id] } })
      setProductEditIdMap(productEditIdMap => ({
        ...productEditIdMap,
        [product.id]: false,
      }))
    } else {
      setProductEditIdMap(productEditIdMap => ({
        ...productEditIdMap,
        [product.id]: true,
      }))
    }
  }

  // const onProductCreateKeyPress = () => async (event: React.KeyboardEvent<HTMLDivElement>) => {
  //   if (event.key === "Enter") {
  //     await onProductCreate()
  //   }
  // }

  // const onProductUpdateKeyPress = (product: Product) => async (event: React.KeyboardEvent<HTMLDivElement>) => {
  //   if (event.key === "Enter") {
  //     await onProductEditClick(product)
  //   }
  // }

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {products.map(product => (
          <Grid item xs={2} sm={4} md={4} key={product.id}>
            <ProductCard
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
              AddingLoading={isUpdatingProduct && selectedProduct?.id === product.id}
              RemovingLoading={isAdding}
              onChangeRating = {onChangeRating}
              product={product}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
