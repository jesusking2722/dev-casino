/*
* Laravel Pagination Docs:
*
* {
   "total": 50,
   "per_page": 15,
   "current_page": 1,
   "last_page": 4,
   "first_page_url": "http://laravel.app?page=1",
   "last_page_url": "http://laravel.app?page=4",
   "next_page_url": "http://laravel.app?page=2",
   "prev_page_url": null,
   "path": "http://laravel.app",
   "from": 1,
   "to": 15,
   "data":[
        {
            // Record...
        },
        {
            // Record...
        }
   ]
}
* */


export type MetaPagination<Data> = {
    success: boolean
    data?: Data
    meta?: {
        total: number,
        count: number,
        per_page: number,
        current_page: number,
        total_pages: number,
        links: {
            next?: string,
            previous?: string
        }
    }
}