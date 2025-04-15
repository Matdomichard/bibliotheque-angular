import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivresComponent } from './livres.component';
import { LivreService } from 'src/app/services/livre.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';


describe('LivresComponent', () => {
  let component: LivresComponent;
  let fixture: ComponentFixture<LivresComponent>;
  let mockLivreService: jest.Mocked<LivreService>;

  beforeEach(async () => {
    const livreServiceMock: Partial<jest.Mocked<LivreService>> = {
      getLivresDisponibles: jest.fn().mockReturnValue(of([])),
      ajouterLivre: jest.fn().mockReturnValue(of({ id: 1, titre: 'Test', auteur: 'Auteur', disponible: true })),
      emprunterLivre: jest.fn().mockReturnValue(of({ message: 'Livre emprunté' })),
      retournerLivre: jest.fn().mockReturnValue(of({ message: 'Livre retourné' })),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [LivresComponent],
      providers: [
        { provide: LivreService, useValue: livreServiceMock }
      ]
    }).compileComponents();
    

    fixture = TestBed.createComponent(LivresComponent);
    component = fixture.componentInstance;
    mockLivreService = TestBed.inject(LivreService) as jest.Mocked<LivreService>;
    fixture.detectChanges();
  });

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it('devrait charger les livres au démarrage', () => {
    expect(mockLivreService.getLivresDisponibles).toHaveBeenCalled();
  });
});
