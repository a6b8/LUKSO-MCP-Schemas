export const schema = {
    namespace: "luksoNetwork",
    name: "LUKSO BlockScout Statistics",
    description: "Charts and blockchain stats from LUKSO BlockScout",
    docs: ["https://explorer.execution.mainnet.lukso.network/api-docs", "https://explorer.execution.testnet.lukso.network/api-docs"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://explorer.execution.--chain--.lukso.network/api/v2",
    requiredServerParams: [],
    headers: {},
    routes: {
      getStats: {
        requestMethod: "GET",
        description: "General blockchain stats",
        route: "/stats",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } }
        ],
        tests: [
          { _description: "Fetch general stats", chainName: "LUKSO_MAINNET" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getTransactionChart: {
        requestMethod: "GET",
        description: "Transaction activity chart",
        route: "/stats/charts/transactions",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } }
        ],
        tests: [
          { _description: "Get tx chart", chainName: "LUKSO_TESTNET" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getMarketChart: {
        requestMethod: "GET",
        description: "Token market stats (price, cap, etc.)",
        route: "/stats/charts/market",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } }
        ],
        tests: [
          { _description: "Get market chart", chainName: "LUKSO_MAINNET" }
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
  