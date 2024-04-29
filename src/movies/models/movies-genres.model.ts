import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Movie } from "./movie.model";
import { Genre } from "src/genres/models/genre.model";

@Table({createdAt: false, updatedAt: false})
export class MoviesGenres extends Model {
    @Column({unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => Movie)
    @Column
    movieId: number;

    @ForeignKey(() => Genre)
    @Column
    genreId: number;
}