import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketSectorsComponent } from './market-sectors.component';

describe('MarketSectorsComponent', () => {
  let component: MarketSectorsComponent;
  let fixture: ComponentFixture<MarketSectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketSectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
