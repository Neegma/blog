// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nodePath = require("path");

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

    // Read post URLs from /posts directory
    const postsDir = nodePath.join(__dirname, "..", "posts");
    const postUrls = fs.existsSync(postsDir)
        ? fs
              .readdirSync(postsDir)
              .filter((f) => f.endsWith(".md"))
              .map((f) => `${baseUrl}/${f.replace(/\.md$/, "")}`)
        : [];

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
