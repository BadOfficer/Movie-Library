import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Genre extends Model{
    @Column({unique: true, primaryKey: true, autoIncrement: true})
    id: number;
    
    @Column({allowNull: false})
    title: string;

    @Column({allowNull: false})
    description: string;
}