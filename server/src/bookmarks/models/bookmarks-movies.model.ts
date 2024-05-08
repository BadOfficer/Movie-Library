import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Movie } from "src/movies/models/movie.model";
import { Bookmarks } from "./bookmarks.model";

@Table({createdAt: false, updatedAt: false})
export class BookmarksMovies extends Model {
    @Column({unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => Movie)
    @Column
    movieId: number;

    @ForeignKey(() =>Bookmarks)
    @Column
    bookmarkId: number;
}