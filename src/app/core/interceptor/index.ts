import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HandleerorInterceptor } from "./handleeror.interceptor";
import { JwtInterceptor } from "./jwt.interceptor";



export const HttpInterceptorProvider = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HandleerorInterceptor,
        multi: true
    }
]