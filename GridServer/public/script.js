// Import the necessary components
import Onboard, { OnboardAPI } from "@web3-onboard/core";
import { ConnectModalOptions } from "@web3-onboard/core/dist/types";
import injectedModule from "@web3-onboard/injected-wallets";
import luksoModule from "@lukso/web3-onboard-config";

// Initialize the LUKSO provider from this library
const luksoProvider = luksoModule();

// Define the download link for the extension
const UP_BROWSER_EXTENSION_URL =
  "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl";

// Set up the injected wallet interface
const injectedWallets = injectedModule({
  /**
   * Add custom wallets here that you want
   * to inject into Web3-Onboard
   */
  custom: [luksoProvider],

  // OPTIONAL: Add sorting for supported wallets
  sort: (wallets) => {
    const sorted = wallets.reduce<any[]>((sorted, wallet) => {
      /**
       * Universal Profiles will be placed at the
       * top of the wallet connection screen
       *
       * Add other injected wallet names here
       * to adjust their order
       */
      if (wallet.label === "Universal Profiles") {
        sorted.unshift(wallet);
      } else {
        sorted.push(wallet);
      }
      return sorted;
    }, []);
    return sorted;
  },

  /**
   * OPTIONAL: Specify wallets that should still be displayed
   * in the list, even when unavailable in the browser
   */
  displayUnavailable: ["Universal Profiles"],
});

/**
 * Define at least one blockchain network that is able to
 * interact with the Universal Profile Browser Extension
 */
const supportedChains = [
  {
    id: 42,
    token: "LYX",
    label: "LUKSO Mainnet",
    rpcUrl: "https://rpc.lukso.gateway.fm/",
  },
  {
    id: 4021,
    token: "LYXt",
    label: "LUKSO Testnet",
    rpcUrl: "https://rpc.testnet.lukso.gateway.fm/",
  },
];

/**
 * OPTIONAL: Set up the app description of the
 * Web3-Onboard connection window
 */
const appInfo = {
  name: "My LUKSO App",
  /**
   * Pictures can either be a valid
   * Image URL or SVG as string
   *
   * The icon shows behind the extension picture
   * on the right side, while the connection
   * is being established
   */
  icon: "/my_app_icon.svg",
  /**
   * The logo shows left of the wallet list,
   * indicating the used app
   */
  logo: "<svg> ... </svg>",
  description: "My LUKSO App using Web3-Onboard",
  recommendedInjectedWallets: [
    /**
     * Add other injected wallets and their download links
     * to directly take users to the installation screen
     */
    {
      name: "Universal Profiles",
      url: UP_BROWSER_EXTENSION_URL,
    },
  ],
};

// OPTIONAL: Set up global installation notices
const connectionOptions = {
  iDontHaveAWalletLink: UP_BROWSER_EXTENSION_URL,
  removeWhereIsMyWalletWarning: true,
};

// Create the Web3-Onboard Component
const web3OnboardComponent = Onboard({
  wallets: [injectedWallets],
  chains: supportedChains,

  // OPTIONAL COMPONENTS:
  appMetadata: appInfo,
  connect: connectionOptions,
});