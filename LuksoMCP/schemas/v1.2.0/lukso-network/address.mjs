export const schema = {
    namespace: "luksoNetwork",
    name: "LUKSO BlockScout Addresses",
    description: "All address-level endpoints for LUKSO BlockScout",
    docs: ["https://explorer.execution.mainnet.lukso.network/api-docs", "https://explorer.execution.testnet.lukso.network/api-docs"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://explorer.execution.--chain--.lukso.network/api/v2",
    requiredServerParams: [],
    headers: {},
    routes: {
      listAddresses: {
        requestMethod: "GET",
        description: "List native coin holders",
        route: "/addresses",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } }
        ],
        tests: [
          { _description: "List holders on mainnet", chainName: "LUKSO_MAINNET" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getAddress: {
        requestMethod: "GET",
        description: "Basic address info",
        route: "/addresses/:address_hash",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] } }
        ],
        tests: [
          { _description: "Get address details", chainName: "LUKSO_MAINNET", address_hash: "0xf2f5fD1b32E4ffceA38e5fcC49D50ae91364A4BB" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getAddressCounters: {
        requestMethod: "GET",
        description: "Address usage counters",
        route: "/addresses/:address_hash/counters",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Get address counters", chainName: "LUKSO_MAINNET", address_hash: "0xf2f5fD1b32E4ffceA38e5fcC49D50ae91364A4BB" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getAddressTransactions: {
        requestMethod: "GET",
        description: "Get transactions by address",
        route: "/addresses/:address_hash/transactions",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Get txs for address", chainName: "LUKSO_TESTNET", address_hash: "0xf2f5fD1b32E4ffceA38e5fcC49D50ae91364A4BB" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getAddressTokenTransfers: {
        requestMethod: "GET",
        description: "Token transfers for address",
        route: "/addresses/:address_hash/token-transfers",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Token transfers for address", chainName: "LUKSO_MAINNET", address_hash: "0xf2f5fD1b32E4ffceA38e5fcC49D50ae91364A4BB" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getAddressInternalTxs: {
        requestMethod: "GET",
        description: "Internal txs for address",
        route: "/addresses/:address_hash/internal-transactions",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Get internal txs", chainName: "LUKSO_TESTNET", address_hash: "0xf2f5fD1b32E4ffceA38e5fcC49D50ae91364A4BB" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getAddressLogs: {
        requestMethod: "GET",
        description: "Logs emitted to/from address",
        route: "/addresses/:address_hash/logs",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Get logs", chainName: "LUKSO_MAINNET", address_hash: "0xf2f5fD1b32E4ffceA38e5fcC49D50ae91364A4BB" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getBlocksValidated: {
        requestMethod: "GET",
        description: "Blocks validated by address",
        route: "/addresses/:address_hash/blocks-validated",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Get validated blocks", chainName: "LUKSO_MAINNET", address_hash: "0xf2f5fD1b32E4ffceA38e5fcC49D50ae91364A4BB" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getTokenBalances: {
        requestMethod: "GET",
        description: "Token balances grouped",
        route: "/addresses/:address_hash/tokens",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Grouped token balances", chainName: "LUKSO_TESTNET", address_hash: "0xf2f5fD1b32E4ffceA38e5fcC49D50ae91364A4BB" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getFlatTokenBalances: {
        requestMethod: "GET",
        description: "All token balances (flat)",
        route: "/addresses/:address_hash/token-balances",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Flat token balances", chainName: "LUKSO_MAINNET", address_hash: "0xf2f5fD1b32E4ffceA38e5fcC49D50ae91364A4BB" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getCoinBalanceHistory: {
        requestMethod: "GET",
        description: "Native coin balance history",
        route: "/addresses/:address_hash/coin-balance-history",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Get coin balance history", chainName: "LUKSO_TESTNET", address_hash: "0xf2f5fD1b32E4ffceA38e5fcC49D50ae91364A4BB" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getCoinBalanceByDay: {
        requestMethod: "GET",
        description: "Daily coin balance history",
        route: "/addresses/:address_hash/coin-balance-history-by-day",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Daily balance history", chainName: "LUKSO_MAINNET", address_hash: "0xf2f5fD1b32E4ffceA38e5fcC49D50ae91364A4BB" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
/* stream timeout
      getWithdrawals: {
        requestMethod: "GET",
        description: "Get withdrawals for address",
        route: "/addresses/:address_hash/withdrawals",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["enum(LUKSO_MAINNET,LUKSO_TESTNET)"] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Get withdrawals", chainName: "LUKSO_MAINNET", address_hash: "0xf2f5fD1b32E4ffceA38e5fcC49D50ae91364A4BB" }
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
        return { struct, payload }
      }
    }
  }
  