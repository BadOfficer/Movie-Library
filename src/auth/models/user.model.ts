import { Column, DataType, Default, Model, Table } from "sequelize-typescript";
import { Role } from "./role.enum";
import { IsEmail, Min } from "class-validator";

@Table
export class User extends Model{
    @Column({unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({allowNull: false})
    first_name: string;

    @Column({allowNull: false})
    last_name: string;

    @IsEmail()
    @Column({unique: true, allowNull: false})
    email: string;

    @Min(6)
    @Column({allowNull: false})
    password: string;

    @Default(Role.USER)
    @Column({type: DataType.ENUM(Role.ADMIN, Role.USER)})
    role: Role;
}