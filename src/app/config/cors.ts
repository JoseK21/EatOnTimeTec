import { HttpHeaders } from '@angular/common/http';

export class cors {
    public static httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        })
    };
}