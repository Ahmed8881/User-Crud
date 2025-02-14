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
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
    ];
    this.nextId = Math.max(...this.users.map(u => u.id)) + 1;
  }
}
