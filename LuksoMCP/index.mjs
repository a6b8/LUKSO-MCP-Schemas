import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { FlowMCP, Server } from 'flowmcp'
import { fileURLToPath } from 'url'
import path from 'path'

const config = {
    name: 'LUKSO-MCP',
    description: 'LUKSO Model Context Protocol Server',
    version: '1.0.0'
}

Server
  .getArgvParameters({
      argv: process.argv,
      includeNamespaces: [],
      excludeNamespaces: [],
      activateTags: []
  })
  .prepare({
      scriptRootFolder: path.dirname(fileURLToPath(import.meta.url)),
      schemasRootFolder: './schemas/v1.2.0/',
      localEnvPath: './.empty.env'
  })
  .then(async (schemas) => {
      const server = new McpServer(config)

      schemas.forEach(({ schema, serverParams, activateTags }) => {
          FlowMCP.activateServerTools({
              server,
              schema,
              serverParams,
              activateTags,
              silent: false
          })
      })

      const transport = new StdioServerTransport()
      await server.connect(transport)
  }).catch((e) => {
      console.error('Error starting server:', e)
  })