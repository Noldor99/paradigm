import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { General, Contact } from "./general.entity"
import { Repository } from "typeorm"
import { UpdateGeneralDto } from "./dto/update-general.dto"
import { ReturnType } from './general';
import { FileType, FilesService } from "src/files/files.service"

@Injectable()
export class GeneralService {
  constructor(
    @InjectRepository(General)
    private generalRepository: Repository<General>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    private fileService: FilesService,

  ) { }


  async createGeneral(dto: UpdateGeneralDto, generalImg) {

    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (key !== "contact" && key !== "generalImg") {
        if (dto[key]) acc[key] = dto[key];
      }
      return acc;
    }, {});

    let picturePath = ''

    if (generalImg) {
      picturePath = await this.fileService.createPostImage(
        FileType.GENERAL,
        generalImg,
      )
    }

    let contact = null;
    console.log(dto.contact)
    if (dto.contact && dto.contact !== undefined) {
      //@ts-ignore
      const contactParse = JSON.parse(dto.contact);
      contact = new Contact();
      Object.assign(contact, contactParse);
      await this.contactRepository.save(contact);
    }

    const general = this.generalRepository.create({
      ...dtoFilter,
      generalImg: picturePath,
      contact: contact,
    });

    return await this.generalRepository.save(general);;
  }


  async getGeneralData(returnType: ReturnType) {
    const general = await this.findOne();

    if (!general) {

      return {};
    }

    switch (returnType) {
      case ReturnType.ABOUT:
        return { aboutLexical: general.aboutLexical } || {};
      case ReturnType.CONTACT:
        return { contact: general.contact } || {};
      case ReturnType.WEBSITE_TERMS:
        return { websiteTerms: general.websiteTerms } || {};
      case ReturnType.IMPORTANT_DISCLOSURES:
        return { importantDisclosures: general.importantDisclosures } || {};
      case ReturnType.PRIVACY_POLICY:
        return { privacyPolicy: general.privacyPolicy } || {};
      default:
        return general;
    }
  }


  async findOne() {
    const general = await this.generalRepository.find()

    return general.length > 0 ? general[0] : null;
  }

  async editGeneral(dto: UpdateGeneralDto, generalImg) {


    let general = await this.findOne()

    if (!general) {
      return this.createGeneral(dto, generalImg);
    }

    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (key !== "contact" && key !== "generalImg") {
        if (dto[key]) acc[key] = dto[key];
      }
      return acc;
    }, {});

    Object.assign(general, dtoFilter);

    const urlProjestsImg = general.generalImg

    let picturePath = null

    if (generalImg) {
      picturePath = await this.fileService.updatePostImage(
        urlProjestsImg,
        FileType.GENERAL,
        generalImg,
      )
      general.generalImg = picturePath
    }



    if (dto.contact) {
      //@ts-ignore
      const contactParse = JSON.parse(dto.contact)
      const contact = general.contact || new Contact();
      Object.assign(contact, contactParse);
      const updatedContact = await this.contactRepository.save(contact);
      general.contact = updatedContact;
    }


    const updatedGeneral = await this.generalRepository.save(general);
    return updatedGeneral;
  }


  async remove() {
    const general = await this.generalRepository.find()

    return this.generalRepository.remove(general)
  }

}
