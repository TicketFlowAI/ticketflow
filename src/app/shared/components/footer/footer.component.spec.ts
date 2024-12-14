import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { getTranslocoModule } from '../../../transloco-testing.module';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, getTranslocoModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the current year and translation', () => {
    const footerElement = fixture.debugElement.nativeElement.querySelector('#footer');
    const currentYear = new Date().getFullYear().toString();
    expect(footerElement.textContent).toContain(currentYear);
  });
});
