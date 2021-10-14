/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Gatsby Default Starter for MURA integration",
  },
  plugins: [
    {
      resolve: "gatsby-source-mura",
      options: {
        baseUrl:"https://cwig-dev.icfwebservices.com/",
        maxItems: "9999",
        itemsperpage: "9999",
        fields: "body,summary,title,menutitle,contentid,subtype,type,filename,urltitle,display,assocfilename,links,images",
      },
    },
  ],
};
