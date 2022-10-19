import { ImageService } from 'src/app/services/core/image.service';
import { UserService } from './../../../services/User.service';
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

  open: boolean = true

  constructor(private service: EstablishmentService,
    private httpClient: HttpClient,
    private actRouter: ActivatedRoute,
    private userService: UserService,
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  uploadImage: File = new File(["foo"], "foo.txt", { type: "text/plain", })
  postResponse: any;
  successResponse: string = "";


  public onFileSelected(event: any) {
    this.uploadImage = event.target.files[0];

    console.log(event.target.files[0]);
    
  }

  

  
  onSkip() {
    if (this.text.typeObject == 'ESTABLISHMENT') {

      let image = '../../../../assets/profile/perfil-default.png'

      console.log(image);
      
      
    } else if (this.text.typeObject == 'DRINK') {


    }else if (this.text.typeObject == 'DISH') {
    }

    this.imageService.imageComponentisOpen.emit(false);
  }

  imageUpload(type: string = this.text.typeObject) {
  
    if (type == 'ESTABLISHMENT') {

      const imageFormData = new FormData()
      imageFormData.append('image', this.uploadImage, this.uploadImage.name)
  
      this.httpClient.post('http://localhost:8080/establishment/image/' + this.text.id, imageFormData, { observe: 'response' })
        .subscribe((response: any) => {
          this.postResponse = response
          this.successResponse = this.postResponse.body.message
        });
        this.router.navigate(['user-update/profile-establishment/' + this.text.id])
        
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

    location.reload()

  }
}
