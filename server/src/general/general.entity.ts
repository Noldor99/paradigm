import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  information: string;

  @Column({ default: '' })
  pressInquiries: string;

  @Column({ default: '' })
  investorInquiries: string;

  @Column({ default: '' })
  linkedin: string;

  @Column({ default: '' })
  twitter: string;
}

@Entity('general')
export class General {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  aboutLexical: string;

  @Column({ default: '' })
  websiteTerms: string;

  @Column({ default: '' })
  importantDisclosures: string;

  @Column({ default: '' })
  privacyPolicy: string;

  @Column({ default: '' })
  generalImg: string;

  @OneToOne(() => Contact, { cascade: true, eager: true })
  @JoinColumn()
  contact: Contact
}




