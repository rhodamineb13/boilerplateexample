export interface PaginatedResponse<Type> {
    limit : number;
    page : number;
    total : number;
    data : Type[];
}