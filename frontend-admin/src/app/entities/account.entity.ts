import { Content } from "./content.entity";
import { Contest } from "./contest.entity";
import { ContestEntries } from "./contestentries.entity";
import { Role } from "./role.entity";


export class Account {
    userId : number;
    username: string;
    password: string;
    fullname: string;
    email : string;
    avatarUrl : string;
    status : boolean;
    roles : Role[];
    contest : Contest;
    contestEntries : ContestEntries[];
    
}