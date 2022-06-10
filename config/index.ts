export const MORALIS_SERVER_URL = "https://ty7ttshwev7r.usemoralis.com:2053/server";
export const MORALIS_APP_ID = "wK36eTnEubsFHqXbwWZ0m31RYKGC6ibofNwwTOvn";
export const MORALIS_MASTER_KEY = "oivOABWSwJHNd4NJ9TJO8h3hYzDzQTb9ATF6XyUZ";

export const CMC_KEY = "980181ba-4dbd-4f5d-8136-512067bdba93";

export const DATA_UNAVAILABLE = '--';

export const defaultChainId = 3;

export const VOTING_FACTORY_ADDRESS = "0x616bc855b314012069174a5eF8F6a8A3A1D749AE";

interface IRpcUrls {
  [key: number]: string
}

interface INetworkNames {
  [key: number]: string
}

export const rpcUrls: IRpcUrls = {
  56: 'https://bsc-dataseed.binance.org/',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  3 : 'https://ropsten.infura.io/v3/be0a123d3e494bc28708d61034424f92',
}

export const networkNames: INetworkNames = {
  56: 'BSC Mainnet',
  97: 'BSC Testnet',
  3: 'ROPSTEN'
}

type AddressMapOptions = {
  [key: string]: string
}

export const addressMap: AddressMapOptions = {
  // 'VotingFactory' : '0x04B8847C8fD6A9d9a50345d5956a4FE5680B8Be5',
  'VotingFactory' : '0x616bc855b314012069174a5eF8F6a8A3A1D749AE',
};

interface TokenInfo {
  name: string;
  decimal: number;
}
interface TokenMapOptions {
  [key: string]: TokenInfo
}

export const drawerWidth = 360;
export const drawerWidthCollapsed = 60;
