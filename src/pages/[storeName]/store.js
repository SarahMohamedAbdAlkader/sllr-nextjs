"use client"; // This is a client component

import useSWR from "swr";
import Link from "next/link";

import IntlWrapper from "../../utils/intl-wrapper";

import Footer from "../../components/Footer/Footer";

const useSharedState = (key, initial) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: state, isLoading, mutate: setState } = useSWR(key, fetcher);

  if (isLoading) return { isLoading };
  return state?.data;
};

export default function StoreLayout({ params }) {
  const { storeName } = params || { storeName: "" };
  const businessInfo = useSharedState(
    storeName && `https://api-stg.sllr.co/business/${storeName}`
  );
  const products = useSharedState(
    businessInfo?._id &&
      `https://api-stg.sllr.co/products/v2/trending-products/${businessInfo._id}`
  );

  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: "auto",
    paddingInline: 48,
    lineHeight: "30px",
    backgroundColor: "#4096ff",
  };

  return (
    <IntlWrapper>
      {businessInfo?.isLoading ? (
        <div>....Loading</div>
      ) : (
        <div>
          <div>
            <div>{businessInfo?.storeInfo?.storeName}</div>
            <div>{businessInfo?.storeInfo?.description || "description"}</div>
            <img
              src={businessInfo?.storeInfo?.profileImage}
              style={{ maxWidth: 100 }}
            />
          </div>
          <div>
            <div className="content">
              {products?.products?.map((product, index) => (
                <Link href={`/${storeName}/${product.id}`}>
                  <div hoverable className="br-product-card">
                    {" "}
                    <div className="br-product-card-image">
                      <img
                        alt="product image"
                        src={
                          product?.images?.[0] || "/assets/icons/Product.svg"
                        }
                      />
                    </div>
                    <p>{product?.name || "-"}</p>
                    <p>{`${product?.defaultPrice || 0} EGP`}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Footer businessInfo={businessInfo} />
        </div>
      )}
    </IntlWrapper>
  );
}
