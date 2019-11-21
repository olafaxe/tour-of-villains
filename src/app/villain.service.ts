import { Injectable } from "@angular/core";
import { Villain } from "./villain";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class VillainService {
  getVillains(): Observable<Villain[]> {
    // return of(VILLAINS);
    return this.http
      .get<Villain[]>(this.villainsUrl)
      .pipe(catchError(this.handleError<Villain[]>("getVillains", [])));
  }
  getVillain(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;
    // TODO: send the message _after_ fetching the hero
    return this.http.get<Villain>(url).pipe(
      tap(() => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Villain>(`getVillain id=${id}`))
    );
  }

  updateVillain(villain: Villain): Observable<any> {
    return this.http.put(this.villainsUrl, villain, this.httpOptions).pipe(
      tap(() => this.log(`updated villain id=${villain.id}`)),
      catchError(this.handleError<any>("updateVillain"))
    );
  }

  addVillain(villain: Villain): Observable<Villain> {
    return this.http
      .post<Villain>(this.villainsUrl, villain, this.httpOptions)
      .pipe(
        tap((newVillain: Villain) =>
          this.log(`added villain w/ id=${newVillain.id}`)
        ),
        catchError(this.handleError<Villain>("addVillain"))
      );
  }

  /** DELETE: delete the villain from the server */
  deleteVillain(villain: Villain | number): Observable<Villain> {
    const id = typeof villain === "number" ? villain : villain.id;
    const url = `${this.villainsUrl}/${id}`;

    return this.http.delete<Villain>(url, this.httpOptions).pipe(
      tap(() => this.log(`deleted villain id=${id}`)),
      catchError(this.handleError<Villain>("deleteVillain"))
    );
  }

  /* GET villains whose name contains search term */
  searchVillains(term: string): Observable<Villain[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Villain[]>(`${this.villainsUrl}/?name=${term}`).pipe(
      tap(() => this.log(`found villains matching "${term}"`)),
      catchError(this.handleError<Villain[]>("searchVillains", []))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private villainsUrl = "api/villains"; // URL to web api

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
}
