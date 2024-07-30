export interface Director{
    "name": string,
    "phoneNo": string,
    "_id": string,
}

export interface Movie{
    "_id": string,
    "title": string,
    "director": Director,
    "description": string,
    "year":number,
    "_v": number
}