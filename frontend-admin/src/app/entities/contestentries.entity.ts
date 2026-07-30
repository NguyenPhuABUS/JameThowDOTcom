import { Contest } from "./contest.entity";
import { Role } from "./role.entity";


export class ContestEntries {
    entryId: number;
    userId: number;
    contestId: number;
    contentId: number;
    submissionDate: string;
    contestTitle: string;
    title: string;
    content1: string;
    contentImageUrl: string;
    
    // content
    contentTitle: string;
    contentImage: string;
    username: string;
    contentCreated: string;
    categoryName:string;
    isFree:string;
    rating: string
    createAt: string;
    updateAt: string;
    contentType: string
}