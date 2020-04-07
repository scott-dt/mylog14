import { Injectable } from '@angular/core';
import { runTransaction } from '@numbersprotocol/niota';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  address = 'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
  seed = 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
  /*
  const raw_msg = {
      cid: "QmT1secRZXYoB1ToyhJHyzhqCh5iJzopjhBgidyMDdvRFC",
      type: "text"
  };
  await runTransaction(address, seed, raw_msg);
  */

  constructor() { }

  transaction(message) {
    console.log("Transaction is running");
    runTransaction(this.address, this.seed, message)
    console.log("Transaction is finished");
  }
}
