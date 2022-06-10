import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { addressMap, VOTING_FACTORY_ADDRESS } from '../config';
import VotingFactory from '../contracts/VotingFactory.json';
import VotingPoll from '../contracts/VotingPoll.json';

interface contractsMapOptions {
  [key: string]: Contract
}

export class Contracts {
  web3: Web3;
  contractsMap: contractsMapOptions;
  
  constructor(web3: Web3) {
    this.web3 = web3;
    this.contractsMap = {};

    this.contractsMap = {
      'VotingFactory': new web3.eth.Contract(VotingFactory.abi as AbiItem[]),
      'VotingPoll': new web3.eth.Contract(VotingPoll.abi as AbiItem[]),
    }

    this._updateContractAddresses();
  }

  _updateContractAddresses() {
    this.contractsMap['VotingFactory'].options.address = addressMap['VotingFactory'];
  }
}
  