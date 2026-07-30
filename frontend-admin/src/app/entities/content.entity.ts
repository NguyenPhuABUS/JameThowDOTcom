import { Contest } from "./contest.entity";
import { ContestEntries } from "./contestentries.entity";
import { Role } from "./role.entity";


export class Content {
    contentId: number;
    title: string;
    contentType: string;
    content1: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;  
    isFree: boolean;
    userId : string;
    categoryName: string;
    rating: string;
    username: string
  }