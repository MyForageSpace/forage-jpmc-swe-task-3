import { ServerRespond } from './DataStreamer';

export interface Row {
  ratio: number,
  lower_bound: number,
  upper_bound: number,
  trigger_alert: number,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): any {
    const price1 = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const price2 = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = price1 / price2;

    // Considering 12 months avg ratio is 1
    const lower_bound = 0.9;
    const upper_bound = 1.1;

    return [{
      ratio,
      lower_bound,
      upper_bound,
      trigger_alert: ratio<=lower_bound || ratio>=upper_bound ? ratio : undefined,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
    }]
  }
}
