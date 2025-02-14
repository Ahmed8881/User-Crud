import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

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
  styleUrl: './main.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(100, [
            animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('formAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('0.2s ease-out')
      ]),
      transition(':leave', [
        animate('0.2s ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
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
