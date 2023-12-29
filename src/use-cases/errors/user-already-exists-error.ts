/* eslint-disable prettier/prettier */
export class UserAlreadyExsistsError extends Error {
  constructor() {
    super('E-mail already exists')
  }
}
