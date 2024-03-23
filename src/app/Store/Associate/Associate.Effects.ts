import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { AssociateService } from "src/app/service/associate.service";
import { loadAssociateSuccess, loadAssociateFailure, loadAssociate, addAssociate, addAssociateSuccess, getAssociate, getAssociateSuccess, updateAssociate, updateAssociateSuccess, deleteAssociate, deleteAssociateSuccess } from "./Associate.Action";
import { Associate } from "src/app/Store/Model/associate.model";
import { showAlert } from "../Common/App.Action";

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

    addAssociate = createEffect(() =>
        this.actions.pipe(
            ofType(addAssociate),
            switchMap((action) => {
                return this.service.create(action.inputData).pipe(
                    map((data) => {
                        return of(addAssociateSuccess({inputData: action.inputData})),
                        showAlert({message: 'Created successfully.', resultType: 'pass'})
                    }),
                    catchError((_error) => of(showAlert({message: 'Failed to create associate.', resultType: 'fail'})))
                )
            })
        )
    )

    getAssociate = createEffect(() =>
    this.actions.pipe(
        ofType(getAssociate),
        exhaustMap((action) => {
            return this.service.retrieve(action.id).pipe(
                map((data) => {
                    return getAssociateSuccess({ obj: data })
                }),
                catchError((_error) => of(showAlert({message: 'Failed to retrieve data.', resultType: 'fail'})))
            )
        })
    )
    )

    updateAssociate = createEffect(() =>
        this.actions.pipe(
            ofType(updateAssociate),
            switchMap((action) => {
                return this.service.update(action.inputData).pipe(
                    map((data) => {
                        return of(updateAssociateSuccess({inputData: action.inputData})),
                        showAlert({message: 'Updated successfully.', resultType: 'pass'})
                    }),
                    catchError((_error) => of(showAlert({message: 'Failed to update associate.', resultType: 'fail'})))
                )
            })
        )
    )

    deleteAssociate = createEffect(() =>
        this.actions.pipe(
            ofType(deleteAssociate),
            switchMap((action) => {
                return this.service.delete(action.code).pipe(
                    map((data) => {
                        return of(deleteAssociateSuccess({ code: action.code})),
                        showAlert({message: 'Deleted successfully.', resultType: 'pass'})
                    }),
                    catchError((_error) => of(showAlert({message: 'Failed to delete associate.', resultType: 'fail'})))
                )
            })
        )
    )
}