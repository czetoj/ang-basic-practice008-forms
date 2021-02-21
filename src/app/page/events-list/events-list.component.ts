import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  eventList: BehaviorSubject<Event[]> = this.eventService.list$;
  testEvent: Observable<Event> = this.eventService.get(1);

  constructor(
    private eventService: EventService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void { }

  onDelete(event: Event): void {
    this.eventService.remove(event);
    this.showWarning();
    this.router.navigate(['']);
  }

  showWarning() {
    this.toastr.warning('Sikeresen törölted az eseményt!', 'Üzenet', { timeOut: 3000 })
  }

}
