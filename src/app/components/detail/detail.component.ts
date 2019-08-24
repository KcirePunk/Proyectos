import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { Global } from '../../services/global';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public project: Project;
  public confirm: boolean;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.confirm = false;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
        let id = params.id;

        this.getProject(id);
    });
  }

  getProject(id){
    this._projectService.getProject(id).subscribe(
      response => {
        if(response.project){
          this.project = response.project;
        }else {
          this.project = response.project;
        }
      },
      error => {
          console.log(error);
      }
    );
  }

  deleteProject(id){
    this._projectService.deleteProject(id).subscribe(
        res => {
          if(res.project){
            this._router.navigate(['/proyectos']);
          }
        },
        error => {
          console.log(error);
        }
    );
  }

}
