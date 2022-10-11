import { EstablishmentService } from './../../../../services/EstablishmentService.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EstablishmentImage } from 'src/app/models/establishment/establishmentImage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-establishment-image',
  templateUrl: './upload-establishment-image.component.html',
  styleUrls: ['./upload-establishment-image.component.css']
})
export class UploadEstablishmentImageComponent implements OnInit {

  constructor(private service: EstablishmentService,
    private httpClient: HttpClient,
    private actRouter: ActivatedRoute) { }

  uploadImage: File = new File(["foo"], "foo.txt", {
  type: "text/plain",
  })
  postResponse: any;
  successResponse: string = "";

  image: EstablishmentImage = {
    image: File
  } 

  ngOnInit(): void {
  
  }


  public onFileSelected(event: any) {
    this.uploadImage = event.target.files[0];
  }

  imageUploadAction() {
    console.log(this.uploadImage);
  
    const imageFormData = new FormData()
    imageFormData.append('image', this.uploadImage, this.uploadImage.name)

    this.httpClient.post('http://localhost:8080/establishment/image/'+ this.actRouter.snapshot.params["idEstablishment"], imageFormData, { observe: 'response' })
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.postResponse = response
          this.successResponse = this.postResponse.body.message
        } else {
          this.successResponse = 'Image not uploaded due to some error!'
        } 
      }
    );
  }

  getImage(){
    this.service.getEstablishmentImage(this.actRouter.snapshot.params['idEstablishment']).subscribe((data: any) => {
      this.image = data;
    })
  }

  onSkip(){
  } 
}
