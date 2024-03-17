import { IUser } from "./user"

export interface IPortfolios {
  totalCount: number
  portfolios: IPortfolio[]
}

export interface IPortfolio {
  id: string
  title: string
  subDescription: string
  description: string
  portfolioImg: string
  createdAt: string
  updatedAt: string
  user: IUser
  links: ILinkPortfolio[]
}

export interface ILinkPortfolio {
  id: string
  name: string
  link: string
}
