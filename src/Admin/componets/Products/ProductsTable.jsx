import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts } from "../../../Redux/Customers/Product/Action";

const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
  });

  // query 
  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");


  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value-1);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    // setFilterValue({ availability, category, sort });
    const data = {
      category:category || "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000000,
      minDiscount: 0,
      sort: sort || "price_low",
      pageNumber:page || 0,
      pageSize: 10,
      stock: availability,
    };
    dispatch(findProducts(data));
  }, [availability, category, sort,page,customersProduct.deleteProduct]);

  const handleFilterChange = (e, sectionId) => {
    console.log(e.target.value, sectionId);
    setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleDeleteProduct=(productId)=>{
    console.log("delete product ",productId)
    dispatch(deleteProduct(productId))
  }

  return (
    <Box width={"100%"}>
      <Card className="p-3">
        <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Loại</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.category}
                label="Loại"
                onChange={(e) => handleFilterChange(e, "category")}
              >
                <MenuItem value={"men_jeans"}>Quần jeans nam</MenuItem>
                <MenuItem value={"men_shirt"}>Quần short nam</MenuItem>
                <MenuItem value={"men_t-shirts"}>Áo thun nam</MenuItem>
                <MenuItem value={"men_sweater"}>Áo len nam</MenuItem>
                <MenuItem value={"men_jacket"}>Áo khoác nam</MenuItem>
                <MenuItem value={"men_shirt"}>Áo sơ mi nam</MenuItem>
                <MenuItem value={"women_jeans"}>Quần jeans nữ</MenuItem>
                <MenuItem value={"women_dress"}>Váy Đầm</MenuItem>
                <MenuItem value={"women_t-shirts"}>Áo thun nữ</MenuItem>
                <MenuItem value={"women_sweater"}>Áo len nữ</MenuItem>
                <MenuItem value={"women_jacket"}>Áo khoác nữ</MenuItem>
                <MenuItem value={"women_shirt"}>Áo sơ mi nữ</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sắp xếp theo giá
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.sort}
                label="Sort By Price"
                onChange={(e) => handleFilterChange(e, "sort")}
              >
                <MenuItem value={"price_high"}>Cao - Thấp</MenuItem>
                <MenuItem value={"price_low"}>Thấp - Cao</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Card className="mt-2">
        <CardHeader
          title="All Products"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Ảnh</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Loại</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Giá</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Số lượng</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Cập nhật</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Xóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersProduct?.products?.content?.map((item) => (
                <TableRow
                  hover
                  key={item.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  
                >
                  <TableCell>
                    {" "}
                    <Avatar alt={item.titel} src={item.imageUrl} />{" "}
                  </TableCell>

                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="caption">{item.brand}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.category.name.split("_")[1] === "t-shirts" ? "Áo thun" : item.category.name.split("_")[1] === "jeans" ? "Quần jean" : item.category.name.split("_")[1] === "dress" ? "Đầm" : item.category.name.split("_")[1] === "sweater" ? "Áo len" : item.category.name.split("_")[1] === "jacket" ? "Áo khoác" : item.category.name.split("_")[1] ==="shirt" ? "Áo sơ mi" : "Quần short"}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.discountedPrice}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.quantity}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button onClick={()=>navigate(`/admin/product/update/${item.id}`)} variant="text">Cập nhật</Button>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="text" onClick={()=>handleDeleteProduct(item.id)}>Xóa</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 border">
        {/* <Pagination
          className="py-5 border w-auto"
          size="large"
          count={10}
          color="primary"
          onChange={handlePaginationChange}
        /> */}

        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
            count={customersProduct.products?.totalPages}
            color="primary"
            className=""
            onChange={handlePaginationChange}
            // value={page}
          />
        </div>
      </Card>
    </Box>
  );
};

export default ProductsTable;
