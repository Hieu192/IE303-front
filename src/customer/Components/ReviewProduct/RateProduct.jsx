import {
  Button,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { createRating, createReview } from "../../../Redux/Customers/Review/Action";
import { useNavigate, useParams } from "react-router-dom";
import { findProductById } from "../../../Redux/Customers/Product/Action";
import CustomerRoutes from "../../../Routers/CustomerRoutes";

const RateProduct = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [rating, setRating] = useState();
  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const { productId } = useParams();
  const navigate=useNavigate();

  const handleRateProduct = (e, value) => {
    console.log("rating ----- ", value);
    setRating(value);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
    // You can customize this handler to handle the form data as needed

    dispatch(createReview({review:formData.title,productId}))
    dispatch(createRating({rating: rating,productId }))
    setFormData({title:"",description:""})
    navigate(`/product/${productId}`)

  };
  useEffect(() => {
    dispatch(findProductById({ productId }));
  }, []);

  console.log("rate product" , customersProduct)
  return (
    <div className="px-5 lg:px-20">
      <h1 className="text-xl p-5 shadow-lg mb-8 font-bold">
        Xếp hạng và đánh giá sản phẩm
      </h1>
      <Grid sx={{ justifyContent: "space-between" }} container>
        <Grid
          className="flex  lg:items-center shadow-lg border rounded-md p-5"
          item
          xs={12}
          lg={5.8}
        >
          <div>
            <img
              className="w-[5rem] lg:w-[15rem]"
              src={customersProduct.product?.imageUrl}
              alt=""
            />
          </div>
          <div className="ml-3 lg:ml-5 space-y-2 lg:space-y-4">
            <p className="lg:text-lg">{customersProduct.product?.title}</p>
            <p className="opacity-50 font-semibold">
              {customersProduct.product?.brand}
            </p>
            <p>{customersProduct.product?.price} đ</p>
           {customersProduct.product?.color && <p>Màu: {customersProduct.product?.color}</p>}
            <div className="flex items-center space-x-3">
              <Rating name="read-only" value={customersProduct.product} precision={0.5} readOnly />

              <p className="opacity-60 text-sm">{customersProduct.product?.numRatings} Xếp hạng</p>
              <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {customersProduct.product?.numReviews} đánh giá
              </p>
            </div>
            
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className={`${!isLargeScreen ? "py-10" : ""} space-y-5`}>
            <div className="shadow-md border rounded-md p-5">
              <Typography className="font-semibold" component="legend">
                Xếp hạng cho sản phẩm
              </Typography>
              <Rating
                precision={0.5}
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  handleRateProduct(event, newValue);
                }}
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5 shadow-md border rounded-md"
            >
              <TextField
                label="Đánh giá"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.title}
                onChange={handleChange}
                name="title"
              />
              <Button type="submit" variant="contained" color="primary">
                Gửi đánh giá
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default RateProduct;
