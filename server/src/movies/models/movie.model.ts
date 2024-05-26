import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Genre } from "src/genres/models/genre.model";
import { MoviesGenres } from "./movies-genres.model";
import { Liked } from "src/liked/models/liked.model";
import { LikedMovies } from "src/liked/models/liked-movies.model";
import { Bookmarks } from "src/bookmarks/models/bookmarks.model";
import { BookmarksMovies } from "src/bookmarks/models/bookmarks-movies.model";

@Table
export class Movie extends Model {
    @Column({unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({ type: DataType.STRING})
    title: string;

    @Column({ type: DataType.TEXT })
    description: string;

    @Column({ type: 'JSON' })
    images: string[];

    @Column({ type: DataType.STRING})
    release: string;

    @Column({ type: DataType.INTEGER})
    seasons: number;

    @Column({ type: DataType.INTEGER})
    series: number;

    @Column({ type: DataType.STRING})
    duration: string;

    @Column({ type: DataType.STRING})
    rating: string;

    @BelongsToMany(() => Genre, () => MoviesGenres)
    genres: Genre[];

    @BelongsToMany(() => Liked, () => LikedMovies)
    liked: Liked[];

    @BelongsToMany(() => Bookmarks, () => BookmarksMovies)
    bookmarks: Bookmarks[];
}