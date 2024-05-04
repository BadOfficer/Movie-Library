import { BelongsToMany, Column, DataType, Default, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Role } from "./role.enum";
import { IsEmail, IsNotEmpty, Min } from "class-validator";
import { Liked } from "src/liked/models/liked.model";
import { Bookmarks } from "src/bookmarks/models/bookmarks.model";

@Table
export class User extends Model{
    @Column({unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @IsNotEmpty({message: "first_name can't be empty!"})
    @Column({allowNull: false})
    first_name: string;

    @IsNotEmpty({message: "last_name can't be empty!"})
    @Column({allowNull: false})
    last_name: string;

    @IsEmail()
    @Column({unique: true, allowNull: false})
    email: string;

    @Min(6)
    @Column({allowNull: false})
    password: string;

    @Default(Role.ADMIN)
    @Column({type: DataType.ENUM(Role.ADMIN, Role.USER)})
    role: Role;

    @HasOne(() => Liked, {onDelete: 'CASCADE'})
    liked: Liked;

    @HasOne(() => Bookmarks)
    bookmarks: Bookmarks;
}