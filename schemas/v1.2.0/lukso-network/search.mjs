export const schema = {
    namespace: "luksoNetwork",
    name: "LUKSO BlockScout Search",
    description: "Search and redirect endpoints from LUKSO BlockScout API",
    docs: ["https://explorer.execution.mainnet.lukso.network/api-docs", "https://explorer.execution.testnet.lukso.network/api-docs"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://explorer.execution.--chain--.lukso.network/api/v2",
    requiredServerParams: [],
    headers: {},
    routes: {
      search: {
        requestMethod: "GET",
        description: "Search across tokens, addresses, blocks and transactions",
        route: "/search",
        parameters: [
            { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
            { position: { key: "search_query", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
        ],
        tests: [
            { _description: "Search for USDT on mainnet", chainName: "LUKSO_MAINNET", search_query: "USDT" },
            { _description: "Search for LYX on testnet", chainName: "LUKSO_TESTNET", search_query: "LYX" }
        ],
        modifiers: [
            { phase: "pre", handlerName: "modifyQuery" },
            { phase: "post", handlerName: "modifyResult" }
        ]
      },
      searchRedirect: {
        requestMethod: "GET",
        description: "Check if search redirects to a specific resource",
        route: "/search/check-redirect",
        parameters: [
            { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
            { position: { key: "search_query", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
        ],
        tests: [
            { _description: "Redirect check for USDT", chainName: "LUKSO_MAINNET", search_query: "USDT" },
            { _description: "Redirect check for LYX", chainName: "LUKSO_TESTNET", search_query: "LYX" }
        ],
        modifiers: [
            { phase: "pre", handlerName: "modifyQuery" },
            { phase: "post", handlerName: "modifyResult" }
        ]
      }
    },
    handlers: {
        modifyQuery: async ({ struct, payload, userParams }) => { 
            const alias = {
                'LUKSO_MAINNET': 'mainnet',
                'LUKSO_TESTNET': 'testnet'
            }
            const { chainName } = userParams
            const chain = alias[ chainName ]
            payload['url'] = payload['url']
                .replace( 'search_query=', 'q=' )
                .replace( '--chain--', chain )            

            return { struct, payload };
        },
        modifyResult: async ({ struct, payload }) => { 
            return { struct, payload }
        }
    }
}
  