import React from "react";
import { useSelector } from "react-redux";
import { SmallCard } from "../../components";
import Loader from "../../components/Loader/Loader";

import "./ShopCards.scss";

const ShopCards = () => {
  const shops = useSelector((state) => state.shops);

  return (
    <div className="container">
      <div className="ShopCards">
        <h3>Магазины</h3>
        <div className="shop">
          {shops.data ? (
            shops.data.map((shop, idx) => (
              <SmallCard card={shop} key={idx} link={"/shop/" + shop._id} />
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopCards;
