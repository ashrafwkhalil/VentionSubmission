import { MinLength } from "class-validator"
import { Column, Entity } from "typeorm"
import { RootEntity } from "./root.entity"


@Entity()
export class Product extends RootEntity {
  @Column()
  @MinLength(5, { always: true })
  text: string

  @Column()
  inCart?: boolean;

  @Column()
  rating?: number;

  @Column()
  img?: string;
}

