import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    date: String;

    @Column()
    completed: boolean;

    // Many todos can belongs to single user

    @ManyToOne(() => User, (user)=>user.todos)
    user: User;

}
