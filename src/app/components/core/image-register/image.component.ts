import { UserService } from './../../../services/User.service';
import { ImageService } from 'src/app/services/core/image.service';
import { Router } from '@angular/router';
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

  uploadImage: File = new File(["foo"], "foo.txt", { type: "text/plain", })

  postResponse: any;

  successResponse: string = ""

  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onFileSelected(event: any) {
    this.uploadImage = event.target.files[0];
  }

  onSkip() {
    if (this.text.typeObject == 'ESTABLISHMENT')
      this.router.navigate(['user-update/profile-establishment/' + this.text.id])
    else if (this.text.typeObject == 'DISH')
      this.router.navigate(['consumables/' + JSON.parse(this.userService.getUserAutenticado()).id])
    else if (this.text.typeObject == 'DRINK')
      this.router.navigate(['consumables/' + JSON.parse(this.userService.getUserAutenticado()).id])


    this.imageService.imageisOpen.emit(false);
  }

  imageUpload(type: string = this.text.typeObject) {

    if (type == 'ESTABLISHMENT') {

      const imageFormData = new FormData()
      imageFormData.append('image', this.uploadImage, this.uploadImage.name)

      this.imageService.postImage('establishment', this.text.id, imageFormData)
        .subscribe((response: any) => {
          this.postResponse = response
          this.successResponse = this.postResponse.body.message
        });
      this.router.navigate(['home-establishment/' + JSON.parse(this.userService.getUserAutenticado()).id])

    } else if (type == 'DRINK') {

      const imageFormData = new FormData()
      imageFormData.append('image', this.uploadImage, this.uploadImage.name)

      this.imageService.postImage('drink', this.text.id, imageFormData)
        .subscribe((response: any) => {
          this.postResponse = response
          this.successResponse = this.postResponse.body.message
        });

      this.router.navigate(['consumables/' + JSON.parse(this.userService.getUserAutenticado()).id])


    } else if (type == 'DISH') {

      const imageFormData = new FormData()
      imageFormData.append('image', this.uploadImage, this.uploadImage.name)

      this.imageService.postImage('dish', this.text.id, imageFormData)
        .subscribe((response: any) => {
          this.postResponse = response
          this.successResponse = this.postResponse.body.message
        });

      this.router.navigate(['consumables/' + JSON.parse(this.userService.getUserAutenticado()).id])
    }
  }
}
