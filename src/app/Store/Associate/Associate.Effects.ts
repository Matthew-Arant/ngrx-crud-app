import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { AssociateService } from "src/app/service/associate.service";
import { loadAssociateSuccess, loadAssociateFailure, loadAssociate } from "./Associate.Action";

@Injectable()

export class AssociateEffects{
    constructor(private actions: Actions, private service:AssociateService) {

    }

    loadAssociate = createEffect(() =>
        this.actions.pipe(
            ofType(loadAssociate),
            exhaustMap((action) => {
                return this.service.getAll().pipe(
                    map((data) => {
                        return loadAssociateSuccess({list:data})
                    }),
                    catchError((_error) => of(loadAssociateFailure({errormessage: _error.message})))
                )
            })
        )
    )
}