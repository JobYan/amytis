export const siteConfig = {
  title: "Amytis",
  description: "A minimalist digital garden for growing thoughts and sharing knowledge.",
  footerText: `© ${new Date().getFullYear()} Amytis. All rights reserved.`,
  nav: [
    { name: "Garden", url: "/", weight: 1 },
    { name: "Archive", url: "/archive", weight: 2 },
    { name: "Tags", url: "/tags", weight: 3 },
    { name: "About", url: "/about", weight: 4 },
  ],
  pagination: {
    pageSize: 10,
  }
};
