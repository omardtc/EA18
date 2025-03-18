import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { songsService, Song } from '../songs.service'; 
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  songText = ''; 
  songs$: Observable<Song[]> = new Observable(); // Cambiar a Observable para Firestore
  editingSongId: string | null = null; 

  constructor(private songService: songsService, private authService: AuthService, private router: Router) {} 

  ngOnInit() {
    this.songs$ = this.songService.getSongs(); // Obtener tareas desde Firestore
  }

  addSong() {
    if (this.songText.trim()) {
      const newSong: Song = { title: this.songText, done: false };

      if (this.editingSongId) {
        this.songService.updateSong(this.editingSongId, { title: this.songText }).then(() => {
          this.editingSongId = null; 
          this.songText = '';
        });
      } else {
        this.songService.addSong(newSong).then(() => {
          this.songText = '';
        });
      }
    }
  }

  editSong(song: Song) {
    this.songText = song.title;
    this.editingSongId = song.id || null;
  }

  deleteSong(songId: string) {
    this.songService.deleteSong(songId);
  }

  async logout() {
    try {
      await this.authService.logout();
      alert('Sesión cerrada exitosamente');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}