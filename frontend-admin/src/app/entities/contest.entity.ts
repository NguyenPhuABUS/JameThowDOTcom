import { Account } from "./account.entity";

export class Contest {
    contestId : number;
    title : string;
    description : string;
    startDate : string;
    endDate : string;
    winnerUserId : string;
    account : Account;
}