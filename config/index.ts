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
    // 'VotingFactory' : '0x616bc855b314012069174a5eF8F6a8A3A1D749AE',
    'VotingFactory' : '0xE11E38fB9F9f4227f8F1B31143A34771D5BD2717',
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
