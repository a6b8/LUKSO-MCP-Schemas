export const schema = {
    namespace: "luksoNetwork",
    name: "LUKSO BlockScout Meta",
    description: "Main page, config, health and Celestia-specific endpoints",
    docs: ["https://explorer.execution.mainnet.lukso.network/api-docs", "https://explorer.execution.testnet.lukso.network/api-docs"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://explorer.execution.--chain--.lukso.network/api/v2",
    requiredServerParams: [],
    headers: {},
    routes: {
      getMainPageTransactions: {
        requestMethod: "GET",
        description: "Latest transactions for main page",
        route: "/main-page/transactions",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } }
        ],
        tests: [
          { _description: "Main page txs", chainName: "LUKSO_MAINNET" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getMainPageBlocks: {
        requestMethod: "GET",
        description: "Latest blocks for main page",
        route: "/main-page/blocks",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } }
        ],
        tests: [
          { _description: "Main page blocks", chainName: "LUKSO_TESTNET" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
/* wrong swagger file
      getIndexingStatus: {
        requestMethod: "GET",
        description: "Indexing status for main page",
        route: "/main-page/indexing-status",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["enum(LUKSO_MAINNET,LUKSO_TESTNET)"] } }
        ],
        tests: [
          { _description: "Indexing status", chainName: "LUKSO_MAINNET" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getRpcUrl: {
        requestMethod: "GET",
        description: "Current RPC config endpoint",
        route: "/config/json-rpc-url",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["enum(LUKSO_MAINNET,LUKSO_TESTNET)"] } }
        ],
        tests: [
          { _description: "Fetch RPC URL", chainName: "LUKSO_TESTNET" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getHealth: {
        requestMethod: "GET",
        description: "API health status",
        route: "/health",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["enum(LUKSO_MAINNET,LUKSO_TESTNET)"] } }
        ],
        tests: [
          { _description: "Health check", chainName: "LUKSO_MAINNET" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getAccountAbstractionStatus: {
        requestMethod: "GET",
        description: "Account abstraction status proxy",
        route: "/proxy/account-abstraction/status",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["enum(LUKSO_MAINNET,LUKSO_TESTNET)"] } }
        ],
        tests: [
          { _description: "AA status", chainName: "LUKSO_MAINNET" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getCelestiaBlob: {
        requestMethod: "GET",
        description: "Get Celestia blob data",
        route: "/api/v1/celestia/blob",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["enum(LUKSO_MAINNET,LUKSO_TESTNET)"] } }
        ],
        tests: [
          { _description: "Celestia blob", chainName: "LUKSO_TESTNET" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getL2BatchMetadata: {
        requestMethod: "GET",
        description: "Celestia L2 batch metadata",
        route: "/api/v1/celestia/l2BatchMetadata",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["enum(LUKSO_MAINNET,LUKSO_TESTNET)"] } }
        ],
        tests: [
          { _description: "L2 batch metadata", chainName: "LUKSO_MAINNET" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      }
*/
    },
    handlers: {
      modifyQuery: async ({ struct, payload, userParams }) => {
        const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" }
        payload.url = payload.url.replace("--chain--", alias[userParams.chainName])
        return { struct, payload }
      },
      modifyResult: async ({ struct, payload }) => {
    if( struct['status'] === false ) {
        console.log( struct['messages'])
    }
        return { struct, payload }
      }
    }
  }
  