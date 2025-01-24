import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AiManagementService } from './ai-management.service';
import { AiService } from '../api/servicios-mindsoftdev/ai.service';
import { MessageService } from '../../shared/services/message.service';
import { TranslocoService } from '@jsverse/transloco';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { IAiClassifiersApiResponse, AiClassifierModel } from '../models/entities/ai-classifier.model';

describe('AiManagementService', () => {
  let service: AiManagementService;
  let aiServiceMock: jasmine.SpyObj<AiService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let translocoServiceMock: jasmine.SpyObj<TranslocoService>;

  const mockClassifiersResponse: IAiClassifiersApiResponse = {
    success: true,
    data: [
      new AiClassifierModel(
        'Classifier A',
        'arn:aws:classifier:A',
        'v1',
        'Completed',
        'en',
        '2025-01-01T12:00:00Z',
        '2025-01-02T12:00:00Z',
        10,
        95.5,
        0.9,
        0.85,
        0.88
      ),
    ],
  };

  beforeEach(() => {
    const aiSpy = jasmine.createSpyObj('AiService', ['getClassifiersAndVersion', 'selectClassifiers']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['addSuccessMessage', 'addErrorMessage']);
    const translocoSpy = jasmine.createSpyObj('TranslocoService', ['translateObject']);

    TestBed.configureTestingModule({
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
          loader: TranslocoHttpLoader,
        }),
        { provide: AiService, useValue: aiSpy },
        { provide: MessageService, useValue: messageSpy },
        { provide: TranslocoService, useValue: translocoSpy },
      ],
    });

    service = TestBed.inject(AiManagementService);
    aiServiceMock = TestBed.inject(AiService) as jasmine.SpyObj<AiService>;
    messageServiceMock = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    translocoServiceMock = TestBed.inject(TranslocoService) as jasmine.SpyObj<TranslocoService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all classifiers successfully', (done) => {
    aiServiceMock.getClassifiersAndVersion.and.returnValue(of(mockClassifiersResponse));

    service.getAllClassifiers().subscribe((classifiers) => {
      expect(classifiers).toEqual(mockClassifiersResponse.data);
      expect(aiServiceMock.getClassifiersAndVersion).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting classifiers', (done) => {
    aiServiceMock.getClassifiersAndVersion.and.returnValue(throwError(() => new Error('Error fetching classifiers')));

    service.getAllClassifiers().subscribe((classifiers) => {
      expect(classifiers).toEqual([]);
      expect(aiServiceMock.getClassifiersAndVersion).toHaveBeenCalled();
      done();
    });
  });

  it('should select classifiers successfully', (done) => {
    aiServiceMock.selectClassifiers.and.returnValue(of(new HttpResponse({ status: 201 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.selectClassifiers('Classifier A', 'Classifier B').subscribe((result) => {
      expect(result).toBeTrue();
      expect(aiServiceMock.selectClassifiers).toHaveBeenCalledWith('Classifier A', 'Classifier B');
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while selecting classifiers', (done) => {
    aiServiceMock.selectClassifiers.and.returnValue(throwError(() => new Error('Error selecting classifiers')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.selectClassifiers('Classifier A', 'Classifier B').subscribe((result) => {
      expect(result).toBeFalse();
      expect(aiServiceMock.selectClassifiers).toHaveBeenCalledWith('Classifier A', 'Classifier B');
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
});
