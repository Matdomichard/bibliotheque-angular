
import { Component, OnInit } from '@angular/core';
import { LivreService } from 'src/app/services/livre.service';
import { Livre } from 'src/app/models/livre';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css']
})
export class LivresComponent implements OnInit {
  livres: Livre[] = [];

  // champs du formulaire
  nouveauTitre = '';
  nouvelAuteur = '';

  constructor(private livreService: LivreService) {}

  ngOnInit(): void {
    this.chargerLivres();
  }

  chargerLivres(): void {
    this.livreService.getLivresDisponibles().subscribe({
      next: (data) => {
        this.livres = data.filter(livre => livre !== null && livre !== undefined);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des livres', err);
      }
    });
  }

  ajouterLivre(): void {
    const livreAAjouter = {
      titre: this.nouveauTitre,
      auteur: this.nouvelAuteur,
      disponible: true
    };
    this.livreService.ajouterLivre(livreAAjouter).subscribe({
      next: (livreCree) => {
        this.livres.push(livreCree);
        // On réinitialise le formulaire
        this.nouveauTitre = '';
        this.nouvelAuteur = '';
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du livre', err);
      }
    });
  }

  emprunterLivre(livre: Livre): void {
    if (!livre.id) return;

    this.livreService.emprunterLivre(livre.id).subscribe({
      next: () => {
        // Sur réponse OK, on met à jour l'état en local
        livre.disponible = false;
      },
      error: (err) => {
        console.error('Erreur lors de l\'emprunt du livre', err);
      }
    });
  }

  retournerLivre(livre: Livre): void {
    if (!livre.id) return;

    this.livreService.retournerLivre(livre.id).subscribe({
      next: () => {
        // Sur réponse OK, on met à jour l'état en local
        livre.disponible = true;
      },
      error: (err) => {
        console.error('Erreur lors du retour du livre', err);
      }
    });
  }
}

