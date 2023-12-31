/* eslint-disable prettier/prettier */
import { Gym } from '@prisma/client'
import { GymsRepository } from '../gym-repository'

export class inMemoryGymsRepository implements GymsRepository {
  
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find(item=>item.id===id)
    
    if(!gym){
        return null
    }

    return gym

  }

}
