import { z } from 'zod'

import { AxiosResponse } from 'axios'

import { api } from '@/lib/axios'

import { IGeneral } from '@/types/general'

export const GeneralSchema = z.object({
  contact: z.object({
    information: z.string().optional(),
    pressInquiries: z.string().optional(),
    investorInquiries: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
  }).optional()
    .or(z.literal(undefined)),
  aboutLexical: z
    .string()
    .min(3, { message: 'About Lexical must be at least 3 characters.' }).optional()
    .or(z.literal('')),
  websiteTerms: z
    .string()
    .min(3, { message: 'Website Terms must be at least 3 characters.' }).optional()
    .or(z.literal('')),
  importantDisclosures: z
    .string()
    .min(3, { message: 'Important Disclosures must be at least 3 characters.' }).optional()
    .or(z.literal('')),
  privacyPolicy: z
    .string()
    .min(3, { message: 'Privacy Policy must be at least 3 characters.' }).optional()
    .or(z.literal('')),
  generalImg: z
    .custom<File>()
    .refine((files) => files, 'Image is required and must be a valid image format.')
    .refine((files) => files?.size <= 5000000, `Max file size is 5MB.`)
    .or(z.string()),
});

export type IGeneralSchema = z.infer<typeof GeneralSchema>

export enum ReturnType {
  ABOUT = 'about',
  CONTACT = 'contact',
  WEBSITE_TERMS = 'websiteTerms',
  IMPORTANT_DISCLOSURES = 'importantDisclosures',
  PRIVACY_POLICY = 'privacyPolicy',
  GENERAL = 'general',
}


export interface ApiGeneral {
  getOne: () => Promise<IGeneral>;
  getGeneralData: (returnType?: ReturnType) => Promise<IGeneral>;
  update: (data: FormData | IGeneralSchema) => Promise<IGeneral>;
}

export const apiGeneral: ApiGeneral = {
  getOne: () => api.get(`/general`).then(qw),
  getGeneralData: (returnType) => api.get(`/general/param?returnType=${returnType}`).then(qw),
  update: (body) => api.patch(`/general`, body).then(qw),
};

const qw = <T>(response: AxiosResponse<T>): T => response.data;
