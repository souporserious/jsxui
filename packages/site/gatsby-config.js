module.exports = {
  siteMetadata: {
    siteUrl: `https://www.jsxui.com`,
    title: `JSXUI`,
    author: `JSXUI Authors`,
    description: `Primitive elements to build isomorphic user interfaces in React.`,
    social: [
      {
        name: `Twitter`,
        url: `https://twitter.com/souporserious`,
      },
      {
        name: `GitHub`,
        url: `https://github.com/souporserious/jsxui`,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`muli\:300,400,700`],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.js`),
      },
    },
  ],
}
