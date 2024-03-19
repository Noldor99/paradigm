export interface IFeedbacks {
  totalCount: number
  feedbacks: IFeedback[]
}

export interface IFeedback {
  id: string
  email: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
}
