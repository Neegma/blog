const fs = require("fs");

const generateSitemap = async () => {
    const { globby } = await import("globby");

    const baseUrl = "https://blog.tryneegma.com";
    const currentDate = new Date().toISOString();

    // Static app routes — exclude dynamic [slug] segments
    const appPaths = await globby([
        "app/**/page.tsx",
        "!app/\\[**\\]/page.tsx",
    ]);

    const staticUrls = appPaths.map((p) => {
        const path = p.replace(/^app\//, "").replace(/(\/)?page\.tsx$/, "");
        return path === "" ? baseUrl : `${baseUrl}/${path}`;
    });

    // Add individual post URLs here once your content source is wired up.
    // e.g. const posts = await fetchAllPosts();
    // const postUrls = posts.map(p => `${baseUrl}/${p.slug}`);
    const postUrls = [];

    const allUrls = [...staticUrls, ...postUrls];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
    .map(
        (url) => `    <url>
        <loc>${url}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>`
    )
    .join("\n")}
</urlset>
`;

    fs.writeFileSync("public/sitemap.xml", sitemap);
    console.log(`Sitemap generated with ${allUrls.length} URL(s).`);
};

generateSitemap();
