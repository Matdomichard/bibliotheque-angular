import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from '../models/livre';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  private API_URL = 'http://localhost:8080';


  constructor(private http: HttpClient) { }

  // GET /livres/disponibles
  getLivresDisponibles(): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.API_URL}/livres/disponibles`);
  }

  // POST /livres - Ajouter un livre
  ajouterLivre(nouveauLivre: Partial<Livre>): Observable<Livre> {
    return this.http.post<Livre>(`${this.API_URL}/livres`, nouveauLivre);
  }

  // POST /livres/{id}/emprunter
  emprunterLivre(id: number): Observable<any> {
    return this.http.post(`${this.API_URL}/livres/${id}/emprunter`, {});
  }

  // POST /livres/{id}/retourner
  retournerLivre(id: number): Observable<any> {
    return this.http.post(`${this.API_URL}/livres/${id}/retourner`, {});
  }
}



