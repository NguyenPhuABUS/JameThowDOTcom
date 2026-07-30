export class PaginatedList<T> {
    items: T[];
    totalCount: number;
    pageIndex: number;
    totalPages: number;
  
    constructor(items: T[], totalCount: number, pageIndex: number, totalPages: number) {
      this.items = items;
      this.totalCount = totalCount;
      this.pageIndex = pageIndex;
      this.totalPages = totalPages;
    }
  }
  