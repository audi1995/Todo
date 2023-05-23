import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>, private userService: UserService
  ) { }

  // Create New Todoby user
  async create(createTodoDto: CreateTodoDto, UserId: number) {
    let todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userService.findUserById(UserId);
    return this.todoRepository.save(todo);
  }

  // Find all Not completed todos by user
  findAllTodoNotCompletedByUser(userId: number) {
    return this.todoRepository.find({ relations: ["user"], where: { user: { id: userId }, completed: false }, });
  }

  // Find all completed todos by user
  findAllTodoCompletedByUser(userId: number) {
    return this.todoRepository.find({ relations: ["user"], where: { user: { id: userId }, completed: true }, });
  }

  // Update todos not completed to completed
  update(todoid: number) {
    return this.todoRepository.update(todoid, { completed: true });
  }

  // Delete todo by user
  remove(todoid: number) {
    return this.todoRepository.delete(todoid);
  }
}





