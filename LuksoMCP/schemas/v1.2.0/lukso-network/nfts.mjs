export const schema = {
    namespace: "luksoNetwork",
    name: "LUKSO BlockScout NFTs",
    description: "Query NFTs owned by address or smart contract",
    docs: ["https://explorer.execution.mainnet.lukso.network/api-docs", "https://explorer.execution.testnet.lukso.network/api-docs"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://explorer.execution.--chain--.lukso.network/api/v2",
    requiredServerParams: [],
    headers: {},
    routes: {
      getNFTsByAddress: {
        requestMethod: "GET",
        description: "NFTs owned by address",
        route: "/addresses/:address_hash/nft",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Get NFTs for address", chainName: "LUKSO_MAINNET", address_hash: "0xC15509fDB3616FdE248d56122138f2F7C122a123" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getNFTCollectionsByAddress: {
        requestMethod: "GET",
        description: "NFTs grouped by collection",
        route: "/addresses/:address_hash/nft/collections",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Get NFT collections", chainName: "LUKSO_MAINNET", address_hash: "0xC15509fDB3616FdE248d56122138f2F7C122a123" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getNFTInstancesByContract: {
        requestMethod: "GET",
        description: "List all NFT instances in contract",
        route: "/tokens/:address_hash/instances",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } }
        ],
        tests: [
          { _description: "Get NFT instances", chainName: "LUKSO_MAINNET", address_hash: "0x4c1dFFd1F59A01Ff7FBe5dabFA4484F3CD50E9CD" }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getNFTInstanceById: {
        requestMethod: "GET",
        description: "Get one NFT by ID",
        route: "/tokens/:address_hash/instances/:id",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: [] } }
        ],
        tests: [
          { _description: "Get NFT instance by ID", chainName: "LUKSO_MAINNET", address_hash: "0x4c1dFFd1F59A01Ff7FBe5dabFA4484F3CD50E9CD", id: 32 }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getNFTInstanceTransfers: {
        requestMethod: "GET",
        description: "Transfers of a specific NFT",
        route: "/tokens/:address_hash/instances/:id/transfers",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: [] } }
        ],
        tests: [
          { _description: "Get NFT transfers", chainName: "LUKSO_MAINNET", address_hash: "0x4c1dFFd1F59A01Ff7FBe5dabFA4484F3CD50E9CD", id: 32 }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getNFTInstanceHolders: {
        requestMethod: "GET",
        description: "Get holders of an NFT instance",
        route: "/tokens/:address_hash/instances/:id/holders",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: [] } }
        ],
        tests: [
          { _description: "Get NFT holders", chainName: "LUKSO_MAINNET", address_hash: "0x4c1dFFd1F59A01Ff7FBe5dabFA4484F3CD50E9CD", id: 32 }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
      getNFTInstanceTransfersCount: {
        requestMethod: "GET",
        description: "Count transfers of an NFT instance",
        route: "/tokens/:address_hash/instances/:id/transfers-count",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(LUKSO_MAINNET,LUKSO_TESTNET)", options: [] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: [] } }
        ],
        tests: [
          { _description: "Get NFT transfer count", chainName: "LUKSO_TESTNET", address_hash: "0x4c1dFFd1F59A01Ff7FBe5dabFA4484F3CD50E9CD", id: 32 }
        ],
        modifiers: [{ phase: "pre", handlerName: "modifyQuery" }, { phase: "post", handlerName: "modifyResult" }]
      },
/*
      refetchNFTMetadata: {
        requestMethod: "PATCH",
        description: "Force metadata re-fetch",
        route: "/tokens/:address_hash/instances/:id/refetch-metadata",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["enum(LUKSO_MAINNET,LUKSO_TESTNET)"] } },
          { position: { key: "address_hash", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: [] } },
          { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "number()", options: [] } }
        ],
        tests: [
          { _description: "Trigger NFT metadata update", chainName: "LUKSO_TESTNET", address_hash: "0x80D898C5A3A0B118a0c8C8aDcdBB260FC687F1ce", id: 1 }
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
// console.log( payload )
// console.log( struct )
        return { struct, payload }
      }
    }
  }
  