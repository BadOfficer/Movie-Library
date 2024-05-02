import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { Genre } from "src/genres/models/genre.model";
import { MoviesGenres } from "./movies-genres.model";
import { User } from "src/users/models/user.model";
import { LikedList } from "src/users/models/liked-list.model";
import { Bookmarks } from "src/users/models/bookmarks.model";

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

    @BelongsToMany(() => User, () => LikedList)
    likedList: User[];

    @BelongsToMany(() => User, () => Bookmarks)
    bookmars: User[];
}