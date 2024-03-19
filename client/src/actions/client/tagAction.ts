import { z } from 'zod'
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'
import { ITag, ITags, TagVariant } from '@/types/tag';

export const TagSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters.' })
    .max(50, { message: 'Name must be at most 50 characters.' }),
  variant: z.string()
});

export type ITagSchema = z.infer<typeof TagSchema>

export interface QueryTagParams {
  page?: string;
  limit?: string;
  variant?: TagVariant;
  search?: string

}

export interface ApiTag {
  create: (body: ITagSchema) => Promise<ITag>;
  getAll: (params: QueryTagParams) => Promise<ITags>;
  getOne: (id: string) => Promise<ITag>;
  update: (tagId: string, data: ITagSchema) => Promise<ITag>;
  remove: (id: string) => Promise<void>;
}

export const apiTag: ApiTag = {
  create: (body) => api.post('/tag', body).then(qw),
  getAll: (params) => api.get('/tag', { params }).then(qw),
  getOne: (id) => api.get(`/tag/${id}`).then(qw),
  update: (tagId, body) => api.patch(`/tag/${tagId}`, body).then(qw),
  remove: (id) => api.delete(`/tag/${id}`).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;