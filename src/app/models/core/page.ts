export interface Page {
        content: any[]
        pageable: any
        last: boolean
        totalPages: number
        totalElements: number
        size: number
        number: number
        first: boolean
        numberOfElements: number
        empty: boolean,
        typeSearch: string
}

export interface Pageable {
        sort: Sort
        offset: number
        pageNumber: number
        pageSize: number
        paged: boolean
        unpaged: boolean
}

export interface Sort {
        empty: boolean
        sorted: boolean
        unsorted: boolean
}