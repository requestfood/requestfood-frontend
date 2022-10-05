import { LoadingService } from './../../../services/loading.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private activeRequest = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(this.activeRequest == 0){
      this.loadingService.show();
    }

    this.activeRequest++;
    
    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequest--;

        if(this.activeRequest == 0)
          this.loadingService.hide()
      })
    );
  }
}
