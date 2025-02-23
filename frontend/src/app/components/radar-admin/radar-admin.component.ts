import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {Technology} from '../../models/Technology';
import {TechnologyService} from '../../services/technology.service';

@Component({
  selector: 'app-radar-admin',
    imports: [
        NgForOf
    ],
  templateUrl: './radar-admin.component.html',
  styleUrl: './radar-admin.component.sass'
})
export class RadarAdminComponent {
  technologies: Technology[]  = [];

  constructor(private service: TechnologyService) {
    service.getTechnologies().subscribe(technologies => {this.technologies = technologies;});
  }
}
