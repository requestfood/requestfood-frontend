import { MessageService } from './../../../services/core/message.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let messageError = ""

        if(err.status != 200){
          messageError = err.error.message
        } else {
          messageError = err.error.text
        }

        this.messageService.add(messageError)

        return throwError(() => new Error());
      })
    );
  }
}
