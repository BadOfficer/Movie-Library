import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Movie } from "src/movies/models/movie.model";
import { User } from "./user.model";

@Table({createdAt: false, updatedAt: false})
export class Bookmarks extends Model {
    @Column({unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => Movie)
    @Column
    movieId: number;

    @ForeignKey(() => User)
    @Column
    userId: number;
}