import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
@Injectable()
export class FileExtender implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.file['id'] = Number(req.body.id);
    req.file['title'] = req.body.title;
    req.file['description'] = req.body.description;
    req.file['category'] = Number(req.body.category);
    return next.handle();
  }
}
