export interface IGeneral {
  id: number
  aboutLexical: string
  websiteTerms: string
  importantDisclosures: string
  privacyPolicy: string
  contact: IContact
  generalImg: string
}

export interface IContact {
  id: number
  information: string
  pressInquiries: string
  investorInquiries: string
  linkedin: string
  twitter: string
}
