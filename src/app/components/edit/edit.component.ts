import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: boolean;
  public saveProject: Project;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute
  ) {
    this.title = "Editar Proyecto";
    this.project = new Project('','','','', 2019,'','');
    this.url = Global.url;
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

  onSubmit(){
      this._projectService.updateProject(this.project)
          .subscribe(
            res => {
              if(res.project){
                // Subit la imagen
                if(this.filesToUpload){
                  this._uploadService.makeFileRequest(Global.url+"upload-image/"+res.project._id, [], this.filesToUpload, 'image')
                  .then((result:any) => {
                    this.status = true;
                    this.saveProject = result.project;
                    console.log(result);
                    //from.reset();
                  });
                }else {
                  this.status = true;
                  this.saveProject = res.project;
                }
              }else {
                this.status = false;
              }
            },
            error => {
              console.log(<any>error);
            }

          );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
}

}