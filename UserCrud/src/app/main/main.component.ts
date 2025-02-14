import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  users: User[] = [];
  currentUser: User = this.getEmptyUser();
  editMode = false;
  nextId = 1;

  ngOnInit() {
    // Add some sample data
    this.users = [
      { id: 1, name: 'Ahmed', email: 'Ahmed@example.com', role: 'Admin' },
      { id: 2, name: 'Ali', email: 'ali@example.com', role: 'User' }
    ];
    this.nextId = Math.max(...this.users.map(u => u.id)) + 1;
  }
  getEmptyUser(): User {
    return {
      id: 0,
      name: '',
      email: '',
      role: ''
    };
  }

  saveUser() {
    if (this.editMode) {
      // Update existing user
      const index = this.users.findIndex(u => u.id === this.currentUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.currentUser };
      }
    } else {
      // Add new user
      this.users.push({
        ...this.currentUser,
        id: this.nextId++
      });
    }

    // Reset form
    this.currentUser = this.getEmptyUser();
    this.editMode = false;
  }

  editUser(user: User) {
    this.currentUser = { ...user };
    this.editMode = true;
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  cancelEdit() {
    this.currentUser = this.getEmptyUser();
    this.editMode = false;
  }
}
