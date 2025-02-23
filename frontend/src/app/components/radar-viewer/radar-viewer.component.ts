import {Component} from '@angular/core';
import {TechnologyService} from '../../services/technology.service';
import {Technology} from '../../models/Technology';
import {NgForOf} from '@angular/common';
@Component({
  selector: 'app-radar-viewer',
  imports: [
    NgForOf
  ],
  templateUrl: './radar-viewer.component.html',
  styleUrl: './radar-viewer.component.sass'
})
export class RadarViewerComponent {
  technologies: Technology[] = []
  errorMessage: string = ''

  constructor(private techService: TechnologyService) {}
  ngOnInit(): void {
    this.techService.getTechnologies().subscribe({next: technologies => this.technologies = technologies,
      error: error => this.errorMessage = "An error occurred while loading this page"});
  }
}
