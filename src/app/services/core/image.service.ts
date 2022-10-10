import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }


  imageUploadAction() {
    /*console.log();
  
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
    )*/
  }

  getImage(idEstablishment: number): Observable<any>{
    return this.http.get<any>('http://localhost:8080/establishment/getImage/' + idEstablishment);
  }
}


