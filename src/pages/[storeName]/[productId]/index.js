"use client"; // This is a client component
import useSWR from "swr";

import { useRouter } from "next/router";
import Head from "next/head";


const useSharedState = (key) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: state, isLoading, mutate: setState } = useSWR(key, fetcher);
  if (isLoading) return { isLoading };
  if (!state?.sucess) {
    // return messageApi.open({
    //   type: "error",
    //   content: state?.message,
    // });
    console.log("Not found");
  }
  return state?.data;
};

const SlugPage = ({ params }) => {
  const router = useRouter();
  const { storeName, productId } = router.query;

  const product =
    useSharedState(
      productId && `https://api-stg.sllr.co/products/v2/${productId}`
    ) || {};

  return (
    <div>
      <Head>
        <title>{product.name}</title>
        <meta property="og:title" content={product?.name || ""}></meta>
        <meta property="og:description" content={product?.description || ""} />
        <meta name="description" content={product?.description} key="desc" />
        <meta name="keywords" content="sllr.co"></meta>
        <link
          rel="canonical"
          href={`http://sllr.co/${storeName}/${productId}`}
        />
        <meta
          property="og:url"
          content={`http://sllr.co/${storeName}/${productId}`}
        />
        <meta
          property="og:image"
          content={
            product?.productsVariances?.[0]?.variantDefaultImage ||
            product?.defaultImage
          }
        />
        <meta property="og:type" content="website" />
        <link
          rel="shortcut icon"
          href={
            product?.productsVariances?.[0]?.variantDefaultImage ||
            product?.defaultImage
          }
        />
      </Head>
      <div className="br-product-card-image">
            <img
              alt="product image"
              src={product?.images?.[0] || "/assets/icons/Product.svg"}
            />
          </div>
    </div>
  );
};

export default SlugPage;
