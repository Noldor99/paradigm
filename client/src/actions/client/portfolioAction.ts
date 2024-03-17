import { z } from 'zod'
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'
import { IPortfolios, IPortfolio } from '@/types/portfolio';

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

export const PortfolioSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .trim()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(100, {
      message: 'Title must be less than 100 characters long',
    }),
  subDescription: z
    .string()
    .trim()
    .min(3, {
      message: 'subDescription must be at least 3 characters long',
    })
    .max(120, {
      message: 'subDescription must be less than 120 characters long',
    }),
  description: z
    .string()
    .trim()
    .min(3, {
      message: 'Description must be at least 3 characters long',
    })
    .max(255, {
      message: 'Description must be less than 255 characters long',
    }),
  portfolioImg: z
    .custom<File>()
    .refine((files) => files, 'Image is required and must be a valid image format.')
    .refine((files) => files?.size <= 5000000, `Max file size is 5MB.`)
    .or(z.string()),
  links: z
    .array(
      z.object({
        name: z
          .string()
          .min(4, { message: 'Link name must be at least 4 characters.' })
          .max(16, { message: 'Link name must be at most 16 characters.' })
          .refine((value) => value.trim().length > 0, { message: 'Link name is required.' }),

        link: z.string().refine((value) => urlRegex.test(value), {
          message: 'must be a valid URL',
        }),
      }),
      {
        required_error: 'Links is required.',
      }
    )
});

export type IPortfolioSchema = z.infer<typeof PortfolioSchema>

export interface QueryPortfolioParams {
  page?: number | string;
  limit?: number | string;
}

export interface ApiPortfolio {
  create: (body: FormData | IPortfolioSchema) => Promise<IPortfolio>;
  getAll: (params: QueryPortfolioParams) => Promise<IPortfolios>;
  getOne: (id: string) => Promise<IPortfolio>;
  update: (portfolioId: string, body: FormData | IPortfolioSchema) => Promise<IPortfolio>;
  remove: (id: string) => Promise<void>;
}

export const apiPortfolio: ApiPortfolio = {
  create: (body) => api.post('/portfolio', body).then(qw),
  getAll: (params) => api.get('/portfolio', { params }).then(qw),
  getOne: (id) => api.get(`/portfolio/${id}`).then(qw),
  update: (portfolioId, body) => api.patch(`/portfolio/${portfolioId}`, body).then(qw),
  remove: (id) => api.delete(`/portfolio/${id}`).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;