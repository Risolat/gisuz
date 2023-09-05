const EXTERNAL_DATA_URL = `https://back.gis.uz`;

function generateSiteMap({ locale, posts }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://back.gis.uz</loc>
     </url>
     <url>
       <loc>https://back.gis.uz</loc>
     </url>
     ${posts
       .map(() => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${locale}/api/menu/`}</loc>
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

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(`${EXTERNAL_DATA_URL}/${locale}/api/menu/`);
  const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {
      posts: posts,
      locale: locale,
    },
  };
}

export default SiteMap;
