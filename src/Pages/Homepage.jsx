import React, { useEffect } from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import ProductCard from "../customer/Components/Product/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { findAllProductsPage, findProducts } from "../Redux/Customers/Product/Action";
import { Pagination } from "@mui/material";

const Homepage = () => {
  const { customersProduct } = useSelector((store) => store);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // const param = useParams();
  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };


  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const pageNumber = searchParams.get("page") || 1;

  useEffect(() => {
    const data = {
      pageNumber: pageNumber - 1,
      pageSize: 10,
    };
    dispatch(findAllProductsPage(data));
  }, [
    pageNumber
  ]);
  return (
    <div className="">
      <HomeCarousel images={homeCarouselData} />

      <div className="space-y-10 py-20">
      <h1 className="text-4xl font-extrabold text-gray-900 py-5">Tất cả sản phẩm</h1>

      {/* <HomeProductSection data={mens_kurta} section={"Men's Kurta"} />
        <HomeProductSection data={mensShoesPage1} section={"Men's Shoes"} /> */}
        {/* {categories.map((item) => <HomeProductSection sectionName={item.sectionName} category={item.category}/>)} */}
        <div className="lg:col-span-4 w-full ">
                  <div className="flex flex-wrap justify-center bg-white border py-5 rounded-md ">
                    {customersProduct?.products?.content?.map((item) => (
                      <ProductCard product={item} />
                    ))}
                  </div>
                </div>
                <section className="w-full px-[3.6rem]">
          <div className="mx-auto px-4 py-5 flex justify-center shadow-lg border rounded-md">
            <Pagination
              count={customersProduct.products?.totalPages}
              color="primary"
              className=""
              onChange={handlePaginationChange}
            />
          </div>
        </section>
      </div>

      
    </div>
  );
};

export default Homepage;
