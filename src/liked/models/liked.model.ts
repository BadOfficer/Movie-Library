import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";;
import { User } from "src/users/models/user.model";

@Table({})
export class Liked extends Model {
    @Column({unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.ARRAY(DataType.INTEGER)})
    moviesId: number[];

    @BelongsTo(() => User, {onDelete: "CASCADE"})
    user: User;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, onDelete: 'CASCADE'})
    userId: number;
}