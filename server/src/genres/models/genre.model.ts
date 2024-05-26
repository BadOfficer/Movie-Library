import { IsNotEmpty } from "class-validator";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Movie } from "src/movies/models/movie.model";
import { MoviesGenres } from "src/movies/models/movies-genres.model";

@Table
export class Genre extends Model{
    @Column({unique: true, primaryKey: true, autoIncrement: true})
    id: number;
    
    @IsNotEmpty({message: "title can't be empty!"})
    @Column({allowNull: false, type: DataType.STRING})
    title: string;

    @IsNotEmpty({message: "description can't be empty!"})
    @Column({allowNull: false, type: DataType.TEXT})
    description: string;

    @BelongsToMany(() => Movie, () => MoviesGenres)
    movies: Movie[];
}