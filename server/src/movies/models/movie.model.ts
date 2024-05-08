import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
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

    @Column
    title: string;

    @Column
    description: string;

    @Column({ type: 'JSON' })
    images: string[];

    @Column
    release: string;

    @Column
    seasons: number;

    @Column
    series: number;

    @Column
    duration: string;

    @Column
    rating: string;

    @BelongsToMany(() => Genre, () => MoviesGenres)
    genres: Genre[];

    @BelongsToMany(() => Liked, () => LikedMovies)
    liked: Liked[];

    @BelongsToMany(() => Bookmarks, () => BookmarksMovies)
    bookmarks: Bookmarks[];
}