export const schema = {
    namespace: "luksoNetwork",
    name: "LUKSO BlockScout Tokens",
    description: "Token-related endpoints for transfers, holders, and stats",
    docs: ["https://explorer.execution.mainnet.lukso.network/api-docs", "https://explorer.execution.testnet.lukso.network/api-docs"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://explorer.execution.--chain--.lukso.network/api/v2",
    requiredServerParams: [],
    headers: {},
    routes: {
      listTokens: {
        requestMethod: "GET",
        description: "List all tokens",
        route: "/tokens",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } }
        ],
        tests: [
          { _description: "List tokens on mainnet", chainName: "LUKSO_MAINNET" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getTokenByAddress: {
        requestMethod: "GET",
        description: "Get token metadata",
        route: "/tokens/:address_hash",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Token metadata (LYX)", chainName: "LUKSO_MAINNET", address_hash: "0x6E55472109E6aBE4054a8E8b8d9EdFfCb31032C5" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getTokenTransfersByAddress: {
        requestMethod: "GET",
        description: "Token transfer history",
        route: "/tokens/:address_hash/transfers",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Token transfers (LYX)", chainName: "LUKSO_MAINNET", address_hash: "0x6E55472109E6aBE4054a8E8b8d9EdFfCb31032C5" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getTokenHolders: {
        requestMethod: "GET",
        description: "List token holders",
        route: "/tokens/:address_hash/holders",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Token holders (LYX)", chainName: "LUKSO_MAINNET", address_hash: "0x6E55472109E6aBE4054a8E8b8d9EdFfCb31032C5" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getTokenCounters: {
        requestMethod: "GET",
        description: "Token analytics counters",
        route: "/tokens/:address_hash/counters",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Token counters (LYX)", chainName: "LUKSO_MAINNET", address_hash: "0x6E55472109E6aBE4054a8E8b8d9EdFfCb31032C5" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      }
    },
    handlers: {
      modifyQuery: async ({ struct, payload, userParams }) => {
        const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" }
        payload.url = payload.url.replace("--chain--", alias[userParams.chainName])
        return { struct, payload }
      },
      modifyResult: async ({ struct, payload }) => {
        return { struct, payload }
      }
    }
  }
  