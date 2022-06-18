export interface Catalog {
    Image: any;
    Name: string;
    Description: string;
    Price: string;
    PathImage: string;
}

export interface CatalogGetId {
    description: string;
    id: number
    image: any;
    name: string;
    price: string;
}

export interface CatalogGet {
    description: string;
    id: number;
    image: string;
    name: string;
    pathImage: string;
    price: string;
}