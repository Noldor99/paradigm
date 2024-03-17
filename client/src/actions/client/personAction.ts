import { z } from 'zod'
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'
import { IPersons, IPerson } from '@/types/person';

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

export const PersonSchema = z.object({
  userId: z.string().optional(),
  router: z
    .string()
    .min(3, { message: 'News id must be at least 3 characters.' })
    .max(40, { message: 'News id must be at most 40 characters.' })
    .refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
      message: 'Only english letters and numbers',
    }),
  fullName: z
    .string()
    .trim()
    .min(3, {
      message: 'fullName must be at least 3 characters long',
    })
    .max(100, {
      message: 'fullName must be less than 100 characters long',
    }),
  position: z
    .string()
    .trim()
    .min(3, {
      message: 'position must be at least 3 characters long',
    })
    .max(100, {
      message: 'position must be less than 100 characters long',
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
  personImg: z
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

export type IPersonSchema = z.infer<typeof PersonSchema>

export interface QueryPersonParams {
  page?: string | number;
  limit?: string | number;
}

export interface ApiPerson {
  create: (body: FormData | IPersonSchema) => Promise<IPerson>;
  getAll: (params: QueryPersonParams) => Promise<IPersons>;
  getOne: (id: string) => Promise<IPerson>;
  update: (personId: string, body: FormData | IPersonSchema) => Promise<IPerson>;
  remove: (id: string) => Promise<void>;
}

export const apiPerson: ApiPerson = {
  create: (body) => api.post('/person', body).then(qw),
  getAll: (params) => api.get('/person', { params }).then(qw),
  getOne: (id) => api.get(`/person/${id}`).then(qw),
  update: (personId, body) => api.patch(`/person/${personId}`, body).then(qw),
  remove: (id) => api.delete(`/person/${id}`).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;