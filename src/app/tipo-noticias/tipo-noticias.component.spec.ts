import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoNoticiasComponent } from './tipo-noticias.component';

describe('TipoNoticiasComponent', () => {
  let component: TipoNoticiasComponent;
  let fixture: ComponentFixture<TipoNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoNoticiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
