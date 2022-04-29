import React from "react";
import { useSelector } from "react-redux";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "./SimilarProducts.scss";
import Card from "../../components/Card/Card";

const SimilarProducts = () => {
  const products = useSelector((state) => state.products);
  console.log(products);
  return (
    <div className="container">
      <div className="SimilarProducts">
        <h3>Похожие товары</h3>
        <div className="products">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            modules={[Navigation]}
            navigation={true}
            className="mySwiper"
          >
            {products.data[0].products.map((pdct) => (
              <SwiperSlide>
                <Card category={products.data[0]} product={pdct} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;