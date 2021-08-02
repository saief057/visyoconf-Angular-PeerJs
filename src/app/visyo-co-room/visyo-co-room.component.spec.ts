import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisyoCoRoomComponent } from './visyo-co-room.component';

describe('VisyoCoRoomComponent', () => {
  let component: VisyoCoRoomComponent;
  let fixture: ComponentFixture<VisyoCoRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisyoCoRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisyoCoRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
