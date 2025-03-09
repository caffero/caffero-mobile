import { GetCoffeeList } from "./Coffee";

export interface GetRoastery {
    id: string;
    name: string;
    siteUrl: string;
    contactemail: string;
    contactphone: string;
    contactname: string;
}

export interface GetRoasteryList {
    id: string;
    name: string;
    siteUrl: string;
}

export interface GetRoasteryBeans {
    id: string;
    name: string;
    siteUrl: string;
    coffeeBeans: GetCoffeeList[];
}

export interface CreateRoastery {
    name: string;
    siteUrl: string;
    contactemail: string;
    contactphone: string;
    contactname: string;
}

export interface UpdateRoastery {
    id: string;
    name: string;
    siteUrl: string;
    contactemail: string;
    contactphone: string;
    contactname: string;
}

export interface DeleteRoastery {
    id: string;
}
