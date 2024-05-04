import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Movie } from "src/movies/models/movie.model";
import { Liked } from "./liked.model";

@Table({createdAt: false, updatedAt: false})
export class LikedMovies extends Model {
    @Column({unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => Movie)
    @Column
    movieId: number;

    @ForeignKey(() => Liked)
    @Column
    likedId: number;
}