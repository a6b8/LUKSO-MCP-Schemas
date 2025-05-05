export const schema = {
    namespace: "luksoNetwork",
    name: "LUKSO BlockScout Blocks",
    description: "Retrieve blocks and related data from LUKSO BlockScout",
    docs: ["https://explorer.execution.mainnet.lukso.network/api-docs", "https://explorer.execution.testnet.lukso.network/api-docs"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://explorer.execution.--chain--.lukso.network/api/v2",
    requiredServerParams: [],
    headers: {},
    routes: {
      getBlocks: {
        requestMethod: "GET",
        description: "List recent blocks (optional filtering)",
        route: "/blocks",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "type", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
        ],
        tests: [
          { _description: "List all blocks on mainnet", chainName: "LUKSO_MAINNET" },
          { _description: "List uncle blocks on testnet", chainName: "LUKSO_TESTNET", type: "uncle" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getBlockById: {
        requestMethod: "GET",
        description: "Get detailed info for a block",
        route: "/blocks/:block_id",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "block_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
        ],
        tests: [
          { _description: "Get block by hash", chainName: "LUKSO_MAINNET", block_id: "345678" },
          { _description: "Get block by number", chainName: "LUKSO_TESTNET", block_id: "1234567" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getBlockTransactions: {
        requestMethod: "GET",
        description: "Get transactions within a block",
        route: "/blocks/:block_id/transactions",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "block_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
        ],
        tests: [
          { _description: "Get block txs by number", chainName: "LUKSO_MAINNET", block_id: "1234567" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getBlockWithdrawals: {
        requestMethod: "GET",
        description: "Get withdrawals from a block",
        route: "/blocks/:block_id/withdrawals",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "block_id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
        ],
        tests: [
          { _description: "Get withdrawals from block", chainName: "LUKSO_TESTNET", block_id: "1234567" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      }
    },
    handlers: {
      modifyQuery: async ({ struct, payload, userParams }) => {
        const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" };
        payload.url = payload.url.replace("--chain--", alias[userParams.chainName]);
        return { struct, payload };
      },
      modifyResult: async ({ struct, payload }) => {
        return { struct, payload };
      }
    }
}
  