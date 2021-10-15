const fetch = require('node-fetch')
// const queryString = require('query-string')
const crypto = require('crypto')

exports.sourceNodes = (
  { actions, createNodeId }
) => {
  const { createNode } = actions
  
  // convert mura nodes to gatsby nodes
  const processItem = item => {
    const nodeId = createNodeId(`${item.contentid}`)
    const nodeContent = JSON.stringify(item)
    const nodeContentDigest = crypto
      .createHash('md5')
      .update(nodeContent)
      .digest('hex')

    const nodeData = Object.assign({}, item, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `MuraNode`,
        content: nodeContent,
        contentDigest: nodeContentDigest,
      },
    })

    return nodeData
  }

  // Convert the options object into a query string
  const baseURL = "{siteURL with JSON endpoint}"
  const siteID = "siteID on mura"

  // Join apiOptions with the Pixabay API URL
  const apiUrl = `${baseURL}/index.cfm/_api/json/v1/${siteID}/content`
  
  // Gatsby expects sourceNodes to return a promise
  return (
    // Fetch a response from the apiUrl
    fetch(apiUrl)
      // Parse the response as JSON
      .then(response => response.json())
      // Process the JSON data into a node
      .then(data => {
        // For each query result (or 'hit')
        data.data.items.forEach(item => {
          // Process the item data to match the structure of a Gatsby node
          const nodeData = processItem(item)
          // Use Gatsby's createNode helper to create a node from the node data
          createNode(nodeData)
        })
      })
  )
}