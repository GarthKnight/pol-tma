import {
  Contract, ContractProvider, Sender, Address, Cell, beginCell, TupleBuilder
} from "@ton/core";
import { storeFinalize, loadTupleBetInfo } from "./wrappers";

export default class ChildContract implements Contract {

  async getGetBetInfo(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('getBetInfo', builder.build())).stack;
    const result = loadTupleBetInfo(source);
    return result;
  }

  async getGetoddA(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('getoddA', builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getGetoddB(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('getoddB', builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getIsFinalized(provider: ContractProvider) {
    const { stack } = await provider.get("finalize", []);
    return stack.readBoolean();
  }

  //TODO: probably delete
  async sendTextMessage(provider: ContractProvider, via: Sender, message: string) {
    const messageBody = beginCell()
      .storeUint(0, 32)
      .storeStringTail(message)
      .endCell();

    await provider.internal(via, {
      value: "0.2", // send 0.002 TON for gas
      body: messageBody
    })
  }

  async sendFinishBet(provider: ContractProvider, via: Sender) {
    const messageBody = beginCell().store(storeFinalize({ $$type: "Finalize", outcome_a_wins: true })).endCell();

    await provider.internal(via, {
      value: "0.3", // send 0.002 TON for gas
      body: messageBody
    })
  }

  constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) { }
}

export type BetInfo = {
  $$type: 'BetInfo';
  title: string;
  source: string;
  bet_a_name: string;
  bet_b_name: string;
  image: string;
  odds_a: bigint;
  odds_b: bigint;
}

