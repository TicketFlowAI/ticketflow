import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideTransloco } from "@jsverse/transloco";
import { isDevMode } from "@angular/core";
import { TranslocoHttpLoader } from "./transloco-loader";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTransloco({
          config: {
            availableLangs: ['es', 'en'],
            defaultLang: 'es',
            reRenderOnLangChange: true,
            prodMode: !isDevMode(),
          },
          loader: TranslocoHttpLoader
        }),
      ]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'ticketflow' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Ticketflow');
  });
});
