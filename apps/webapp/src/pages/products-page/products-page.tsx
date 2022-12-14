
// Imports
import { Grid } from "@mui/material"
import { Product } from "@ventionsubmission/models"
import React, { useEffect, useState } from "react"

import ProductCard from "../../components/ProductCard"
import { useCreateOneProductMutation, useGetManyProductsQuery, useUpdateOneProductMutation } from "../../redux/endpoints/products-endpoints"
import productsList from "../../dummyData/products-list"

interface Props {}

export const ProductsPage: React.FC<Props> = () => {
  // get all products into data
  const { data, isLoading: isGetAllProductsLoading } = useGetManyProductsQuery({ sort: ["id,DESC"] })
  // get all data into products const
  const products = (data as unknown as Product[]) || []
  // create product mutation
  const [createProduct, { isLoading: isCreatingProduct }] = useCreateOneProductMutation()
  // update product mutation
  const [updateProduct, { isLoading: isUpdatingProduct }] = useUpdateOneProductMutation()
  // update product rating mutation
  const [updateProductRating, { isLoading: isUpdatingProductRating }] = useUpdateOneProductMutation()
  // selected product state
  const [selectedProduct, setSelectedProduct] = useState<Product>()

  // This is simply my solution to the problem of having the products somehow persist in the database, even though there is no
  // actual remote database that both the evaluator and I can access. If there are no products in the database (the first time you run this)
  // then it will create all the products in the products-list.ts file. 
  useEffect(() => {
    if (!isGetAllProductsLoading) {
      if (products.length == 0) {
        productsList.forEach(async product => {
          await createProduct({ product })
        })
      }
    }
  }, [products])

  // On add to cart, update the product inCart value in the database. I also set selected product so that the loading logic in the loading icon 
  // button works properly for cart additions
  const onAddToCart = async (product: Product) => {
    setSelectedProduct(product)
    await updateProduct({ id: product.id, product: { text: product.text, img: product.img, inCart: true } })
  }
  // On remove from cart, update the product inCart value in the database. 
  const onRemoveFromCart = async (product: Product) => {
    await updateProduct({ id: product.id, product: { text: product.text, img: product.img, inCart: false } })
  }
  // On change rating, update the product rating in the database.
  const onChangeRating = async (product: Product, newRating) => {
    await updateProductRating({
      id: product.id,
      product: { text: product.text, img: product.img, rating: newRating, inCart: product.inCart },
    })
  }

// Very simply UI layout, a grid, with each product mapping to a product card component on the grid
  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {products.map(product => (
          <Grid item xs={2} sm={4} md={4} key={product.id}>
            <ProductCard
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
              // if product is being updated and the selected product is the current product, then show the loading icon
              AddingLoading={isUpdatingProduct && selectedProduct?.id === product.id}
              RemovingLoading={false}
              onChangeRating={onChangeRating}
              product={product}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
