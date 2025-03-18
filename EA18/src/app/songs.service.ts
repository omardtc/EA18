
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Song {
  id?: string;
  title: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class songsService {
  private songsCollection = collection(this.firestore, 'songs');

  constructor(private firestore: Firestore) {}

  getSongs(): Observable<Song[]> {
    return collectionData(this.songsCollection, { idField: 'id' }) as Observable<Song[]>;
  }

  addSong(song: Song) {
    return addDoc(this.songsCollection, song);
  }

  updateSong(id: string, data: Partial<Song>) {
    const songDoc = doc(this.firestore, `songs/${id}`);
    return updateDoc(songDoc, data);
  }

  deleteSong(id: string) {
    const songDoc = doc(this.firestore, `songs/${id}`);
    return deleteDoc(songDoc);
  }
}