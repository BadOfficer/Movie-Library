import { Column, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model{
    @Column({unique: true, primaryKey: true, autoIncrement: true})
    id: number;
    @Column({allowNull: false})
        first_name: string;

    @Column({allowNull: false})
        last_name: string;

    @Column({unique: true, allowNull: false})
        email: string;

    @Column({allowNull: false})
        password: string;
}