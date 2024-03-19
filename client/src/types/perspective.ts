import { ITag } from "./tag"

export interface IPerspectives {
  totalCount: number
  perspectives: IPerspective[]
}

export interface IPerspective {
  id: string
  title: string
  description: string
  perspectiveImg: string
  tags: ITag[]
  createdAt: string
  updatedAt: string

}