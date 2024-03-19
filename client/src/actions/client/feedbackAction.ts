import { z } from 'zod'
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'
import { IFeedback, IFeedbacks } from '@/types/feedback';

export const FeedbackSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters.' })
    .max(50, { message: 'Title must be at most 50 characters.' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters.' })
    .max(450, { message: 'Description must be at most 450 characters.' }),
  email: z
    .string()
    .email({ message: 'Invalid email address.' }),
});

export type IFeedbackSchema = z.infer<typeof FeedbackSchema>

export interface QueryFeedbackParams {
  page?: string;
  limit?: string;
}

export interface ApiFeedback {
  create: (body: IFeedbackSchema) => Promise<IFeedback>;
  getAll: (params: QueryFeedbackParams) => Promise<IFeedbacks>;
  getOne: (id: string) => Promise<IFeedback>;
  update: (feedbackId: string, data: IFeedbackSchema) => Promise<IFeedback>;
  remove: (id: string) => Promise<void>;
}

export const apiFeedback: ApiFeedback = {
  create: (body) => api.post('/feedback', body).then(qw),
  getAll: (params) => api.get('/feedback', { params }).then(qw),
  getOne: (id) => api.get(`/feedback/${id}`).then(qw),
  update: (feedbackId, body) => api.patch(`/feedback/${feedbackId}`, body).then(qw),
  remove: (id) => api.delete(`/feedback/${id}`).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;