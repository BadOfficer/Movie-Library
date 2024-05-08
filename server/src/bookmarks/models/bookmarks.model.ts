import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";import { Movie } from "src/movies/models/movie.model";
;
import { User } from "src/users/models/user.model";
import { BookmarksMovies } from "./bookmarks-movies.model";

@Table({})
export class Bookmarks extends Model {
    @Column({unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @BelongsToMany(() => Movie, () => BookmarksMovies)
    movies: Movie[];

    @BelongsTo(() => User, {onDelete: "CASCADE"})
    user: User;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, onDelete: 'CASCADE'})
    userId: number;
}