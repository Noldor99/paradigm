import { z } from 'zod'
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'
import { IPerspectives, IPerspective } from '@/types/perspective';

export const PerspectiveSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(100, {
      message: 'Title must be less than 100 characters long',
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
  perspectiveImg: z
    .custom<File>()
    .refine((files) => files, 'Image is required and must be a valid image format.')
    .refine((files) => files?.size <= 5000000, `Max file size is 5MB.`)
    .or(z.string()),
  tags: z.array(
    z.object({
      name: z.string(),
    })
  ),
});

export type IPerspectiveSchema = z.infer<typeof PerspectiveSchema>

export interface QueryPerspectiveParams {
  page?: number | string;
  limit?: number | string;
  search?: string;
  tags?: string
}

export interface ApiPerspective {
  create: (body: FormData | IPerspectiveSchema) => Promise<IPerspective>;
  getAll: (params: QueryPerspectiveParams) => Promise<IPerspectives>;
  getOne: (id: string) => Promise<IPerspective>;
  update: (perspectiveId: string, body: FormData | IPerspectiveSchema) => Promise<IPerspective>;
  remove: (id: string) => Promise<void>;
}

export const apiPerspective: ApiPerspective = {
  create: (body) => api.post('/perspective', body).then(qw),
  getAll: (params) => api.get('/perspective', { params }).then(qw),
  getOne: (id) => api.get(`/perspective/${id}`).then(qw),
  update: (perspectiveId, body) => api.patch(`/perspective/${perspectiveId}`, body).then(qw),
  remove: (id) => api.delete(`/perspective/${id}`).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;