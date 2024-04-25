import { IsNotEmpty } from "class-validator";
import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Genre extends Model{
    @Column({unique: true, primaryKey: true, autoIncrement: true})
    id: number;
    
    @IsNotEmpty({message: "title can't be empty!"})
    @Column({allowNull: false})
    title: string;

    @IsNotEmpty({message: "description can't be empty!"})
    @Column({allowNull: false})
    description: string;
}