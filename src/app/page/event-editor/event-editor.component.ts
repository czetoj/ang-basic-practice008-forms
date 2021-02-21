import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  // 1. Kiolvasni az id paramétert az url-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap(params => this.eventService.get(params.id))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void { }

  onUpdate(form: NgForm, event: Event): void {
    if (event.id === 0) {
      this.eventService.create(event);
      this.router.navigate(['']);
      this.showSuccess();
    } else {
      this.eventService.update(event).subscribe(
        () => this.router.navigate([''])
      );
      this.showInfo();
    }
  }

  showSuccess() {
    this.toastr.success('Sikeresen hozzáadtad az eseményt!', 'Üzenet', { timeOut: 3000 })
  }
  showInfo() {
    this.toastr.info('Sikeresen módosítottad az eseményt!', 'Üzenet', { timeOut: 3000 })
  }
}
