export interface IPersons {
  totalCount: number
  persons: IPerson[]
}

export interface IPerson {
  id: string
  router: string
  fullName: string
  position: string
  description: string
  personImg: string
  createdAt: string
  updatedAt: string
  links: ILink[]
}

export interface ILink {
  id: string
  name: string
  link: string
}