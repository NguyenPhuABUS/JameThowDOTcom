import { Contest } from "./contest.entity";
import { ContestEntries } from "./contestentries.entity";
import { Role } from "./role.entity";


export class Feedback {
    feedbackId: number;
    content: string;
    createdAt: string;
    userId: string;
    contentId: string;
    username : string;
    avatarUrl : string;
    rating:string
}