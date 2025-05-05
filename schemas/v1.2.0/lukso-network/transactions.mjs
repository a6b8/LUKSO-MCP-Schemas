export const schema = {
    namespace: "luksoNetwork",
    name: "LUKSO BlockScout Transactions",
    description: "Fetch transactions and their associated data from LUKSO BlockScout",
    docs: ["https://explorer.execution.mainnet.lukso.network/api-docs", "https://explorer.execution.testnet.lukso.network/api-docs"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://explorer.execution.--chain--.lukso.network/api/v2",
    requiredServerParams: [],
    headers: {},
    routes: {
      getTransactions: {
        requestMethod: "GET",
        description: "List transactions (filterable)",
        route: "/transactions",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "type", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
        ],
        tests: [
          { _description: "Get all transactions from mainnet", chainName: "LUKSO_MAINNET" },
          { _description: "Get token_transfer transactions from testnet", chainName: "LUKSO_TESTNET", type: "token_transfer" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getTransactionByHash: {
        requestMethod: "GET",
        description: "Details of a transaction",
        route: "/transactions/:transaction_hash",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "transaction_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{64}$)"] } }
        ],
        tests: [
          { _description: "Get transaction on mainnet", chainName: "LUKSO_MAINNET", transaction_hash: "0x4937ac5bc88a00d9037dcfeca0baf3de468d3983ff5755925956f004fca670f9" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getTokenTransfersByTransactionHash: {
        requestMethod: "GET",
        description: "Token transfers in transaction",
        route: "/transactions/:transaction_hash/token-transfers",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "transaction_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{64}$)"] } }
        ],
        tests: [
          { _description: "Token transfers for transaction", chainName: "LUKSO_MAINNET", transaction_hash: "0x4937ac5bc88a00d9037dcfeca0baf3de468d3983ff5755925956f004fca670f9" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getInternalTransactions: {
        requestMethod: "GET",
        description: "Internal txs in transaction",
        route: "/transactions/:transaction_hash/internal-transactions",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "transaction_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{64}$)"] } }
        ],
        tests: [
          { _description: "Internal txs for transaction", chainName: "LUKSO_MAINNET", transaction_hash: "0x4937ac5bc88a00d9037dcfeca0baf3de468d3983ff5755925956f004fca670f9" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getLogs: {
        requestMethod: "GET",
        description: "Logs from transaction",
        route: "/transactions/:transaction_hash/logs",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "transaction_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{64}$)"] } }
        ],
        tests: [
          { _description: "Get logs for transaction", chainName: "LUKSO_MAINNET", transaction_hash: "0x19a669843e97836b68b75327041e12d5ee91788430337ad0e8158e56fa824b61" }
        ],
        modifiers: [
            { phase: "pre", handlerName: "modifyQuery" }, 
            { phase: "post", handlerName: "modifyResult" }
        ]
      },
      getRawTrace: {
        requestMethod: "GET",
        description: "Raw trace of transaction",
        route: "/transactions/:transaction_hash/raw-trace",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "transaction_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{64}$)"] } }
        ],
        tests: [
          { _description: "Get raw trace", chainName: "LUKSO_MAINNET", transaction_hash: "0x4937ac5bc88a00d9037dcfeca0baf3de468d3983ff5755925956f004fca670f9" }
        ],
        modifiers: [
            { phase: "pre", handlerName: "modifyQuery" }, 
            { phase: "post", handlerName: "modifyResult" }
        ]
      },
      getStateChanges: {
        requestMethod: "GET",
        description: "State changes in transaction",
        route: "/transactions/:transaction_hash/state-changes",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "transaction_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{64}$)"] } }
        ],
        tests: [
          { _description: "Get state changes", chainName: "LUKSO_MAINNET", transaction_hash: "0x4937ac5bc88a00d9037dcfeca0baf3de468d3983ff5755925956f004fca670f9" }
        ],
        modifiers: [
            { phase: "pre", handlerName: "modifyQuery" }, 
            { phase: "post", handlerName: "modifyResult" }
        ]
      },
/* Service unavailable
      getTransactionSummary: {
        requestMethod: "GET",
        description: "Human-readable summary",
        route: "/transactions/:transaction_hash/summary",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["enum(LUKSO_MAINNET,LUKSO_TESTNET)"] } },
          { position: { key: "transaction_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{64}$)"] } }
        ],
        tests: [
          { _description: "Get tx summary", chainName: "LUKSO_MAINNET", transaction_hash: "0x4937ac5bc88a00d9037dcfeca0baf3de468d3983ff5755925956f004fca670f9" }
        ],
        modifiers: [
            { phase: "pre", handlerName: "modifyQuery" }, 
            { phase: "post", handlerName: "modifyResult" }
        ]
      }
*/
    },
    handlers: {
      modifyQuery: async ({ struct, payload, userParams }) => {
        const alias = { LUKSO_MAINNET: "mainnet", LUKSO_TESTNET: "testnet" };
        const { chainName } = userParams
        payload['url'] = payload['url']
            .replace( "--chain--", alias[ chainName ] )
        return { struct, payload };
      },
      modifyResult: async ({ struct, payload }) => {
        return { struct, payload };
      }
    }
};
  