import { Gym, Prisma, User } from "@prisma/client";

export interface FindManyNearbyParms {
    latitude: number,
    longitude: number 
}

export interface GymsRepository {
    findById(id: string): Promise<Gym | null>
    findManyNearby(param: FindManyNearbyParms): Promise<Gym[]>
    searchManyBy(query:string, page: number): Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}