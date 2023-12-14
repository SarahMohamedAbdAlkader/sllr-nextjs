import axios from "axios";

const EXTERNAL_DATA_URL = "https://sllr.co";

const fetchData = async ({ storeName }) => {
  try {
    let config = {
      method: "get",
      url: `https://api-stg.sllr.co/business/${storeName}`,
    };
    const {
      data: { data },
    } = await axios(config);
    return { businessId: data?._id };
  } catch (error) {
    console.log(error);
    return {
      url: `https://sllr.co/${storeName}`,
      lastModified: new Date(),
    };
  }
};

const fetchStoreProducts = async ({ businessId, result, page, storeName }) => {
  try {
    let config = {
      method: "get",
      url: `https://api-stg.sllr.co/products/v2/all/${businessId}?page=${page}&limit=200`,
    };
    const {
      data: { data },
    } = await axios(config);
    const count = data.count;
    const products = data.products.map((product) => {
      return {
        url: `${storeName}/${product.id || ""}`,
        lastModified: new Date(),
        priority: 1.0,
      };
    });
    result.push(...products);
    if (result.length < count) {
      page += 1;
      await fetchData({ result, page });
    }
    return { count };
  } catch (error) {
    console.log(error);
    return {
      // url: `https://sllr.co/${storeName}`,
      // lastModified: new Date(),
    };
  }
};

function generateSiteMap(stores) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://sllr.co">
     ${stores
       .map(({ url }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${url}`}</loc>
           <lastmod>${new Date()}</lastmod>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res, req, query }) {
  const storeName = query?.storeName;
  // We make an API call to gather the URLs for our site
  let result = [];
  let page = 1;
  // const request = await fetch(EXTERNAL_DATA_URL);
  // const posts = await request.json();
  const { businessId } = await fetchData({ storeName });
  const re = await fetchStoreProducts({ businessId, result, page, storeName });
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(result);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
