import { Column, DataType, Default, Model, Sequelize, Table } from "sequelize-typescript";
import { Role } from "./role.enum";
import { ENUM } from "sequelize";

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

    @Default(Role.USER)
    @Column({type: DataType.ENUM("admin", "user")})
        role: Role;
}