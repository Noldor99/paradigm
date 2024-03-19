export enum TagVariant {
  Company = 'company',
  Role = 'role',
  Location = 'location',
}

export interface ITags {
  totalCount: number
  tags: ITag[]
}

export interface ITag {
  id: string
  name: string
  countUse: number
  variant: TagVariant
  createdAt: string
}
