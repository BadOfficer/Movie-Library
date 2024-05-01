import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { Genre } from "src/genres/models/genre.model";
import { MoviesGenres } from "./movies-genres.model";

@Table
export class Movie extends Model {
    @Column({unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column
    title: string;

    @Column
    description: string;

    @Column
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
}