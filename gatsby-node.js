exports.createPages = async ({actions, graphql, reporter}) => {
    const result = await graphql(`
    query MyQuery {
      allMuraNode {
        nodes {
          title
          summary
          id
          filename
          siteid
          url
          entityname
          created
          subtype
          lastupdate
        }
      }
    }
  `)

    if(result.errors) {
        reporter.panic(result.errors);
    }

    result.data.allMuraNode.nodes.forEach(node => {
        actions.createPage({
            path: node.title,
            component: require.resolve('./src/templates/startNow.js'),
            context: {
                MuraId: node.id
            }

        })
        
    });
}
