import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Feedback } from "./feedback.entity"
import { Repository } from "typeorm"
import { CreateFeedbackDto } from "./dto/create-feedback.dto"
import { QueryFeedbackParamsDto } from "./dto/query-feedback-params.dto"
import { UpdateFeedbackDto } from "./dto/update-feedback.dto"

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>
  ) { }


  async create(dto: CreateFeedbackDto): Promise<Feedback> {

    const feedback = this.feedbackRepository.create(dto);
    return await this.feedbackRepository.save(feedback);
  }

  async getAll(dto: QueryFeedbackParamsDto) {
    const { page = 1, limit = 4 } = dto;
    try {
      let queryBuilder = this.feedbackRepository.createQueryBuilder('feedback')
        .orderBy('feedback.createdAt', 'DESC')
        .skip((+page - 1) * +limit)
        .take(+limit);

      const [feedbacks, totalCount] = await queryBuilder.getManyAndCount();

      return { totalCount, feedbacks };
    } catch (e) {
      return { totalCount: 0, feedbacks: [] };
    }
  }


  async findOne(id: string): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: {},
    })

    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`)
    }

    return feedback
  }

  async editFeedback(feedbackId: string, dto: UpdateFeedbackDto) {
    const feedback = await this.findOne(feedbackId);


    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (dto[key]) acc[key] = dto[key];
      return acc;
    }, {});

    Object.assign(feedback, dtoFilter);

    const updatedFeedback = await this.feedbackRepository.save(feedback);
    return updatedFeedback;
  }


  async remove(id: string) {
    const feedback = await this.findOne(id);
    return this.feedbackRepository.remove(feedback)
  }

}
