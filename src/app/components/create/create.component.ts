import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: boolean;
  public saveProject: Project;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = "Crear Proyecto";
    this.project = new Project('','','','', 2019,'','');
  }

  ngOnInit() {
  }

  onSubmit(from) {

    this._projectService.saveProject(this.project)
        .subscribe( res => {
            if(res.project){
              // Subit la imagen
            if(this.filesToUpload){
              this._uploadService.makeFileRequest(Global.url+"upload-image/"+res.project._id, [], this.filesToUpload, 'image')
              .then((result:any) => {
                this.status = true;
                this.saveProject = result.project;
                console.log(result);
                from.reset();
              });
            }else{
              this.status = true;
              this.saveProject = res.project;
            }
            

            }else {
              this.status = false;
            }
        },
        error => {
          console.log(error);
        });
  }

  fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
