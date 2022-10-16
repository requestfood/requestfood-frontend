import { UserService } from './../../../services/User.service';
import { EstablishmentImage } from 'src/app/models/establishment/establishmentImage';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EstablishmentService } from './../../../services/EstablishmentService.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input()
  text: any = {
    title: "",
    textSkip: "Pular",
    textButton: "Concluir",
    typeObject: "",
    id: 0
  }

  constructor(private service: EstablishmentService,
    private httpClient: HttpClient,
    private actRouter: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  uploadImage: File = new File(["foo"], "foo.txt", { type: "text/plain", })
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

  
  getImage() {
    this.service.getEstablishmentImage(this.actRouter.snapshot.params['idEstablishment']).subscribe((data: any) => {
      this.image = data;
    })
  }
  
  onSkip() {

  }

  imageUploadActioneEstablishment(type: string) {
  
    if (type == 'ESTABLISHMENT') {

      const imageFormData = new FormData()
      imageFormData.append('image', this.uploadImage, this.uploadImage.name)
  
      this.httpClient.post('http://localhost:8080/establishment/image/' + this.text.id, imageFormData, { observe: 'response' })
        .subscribe((response: any) => {
          this.postResponse = response
          this.successResponse = this.postResponse.body.message
        });
        this.router.navigate(['home-establishment/' + JSON.parse(this.userService.getUserAutenticado()).id])
        
    } else if (type == 'DRINK') {

      const imageFormData = new FormData()
      imageFormData.append('image', this.uploadImage, this.uploadImage.name)
  
      this.httpClient.post('http://localhost:8080/drink/image/' + this.text.id, imageFormData, { observe: 'response' })
        .subscribe((response: any) => {
          this.postResponse = response
          this.successResponse = this.postResponse.body.message
        });

    }else if (type == 'DISH') {
  
      const imageFormData = new FormData()
      imageFormData.append('image', this.uploadImage, this.uploadImage.name)
  
      this.httpClient.post('http://localhost:8080/dish/image/' + this.text.id, imageFormData, { observe: 'response' })
        .subscribe((response: any) => {
          this.postResponse = response
          this.successResponse = this.postResponse.body.message
        });
    }

  }
}
