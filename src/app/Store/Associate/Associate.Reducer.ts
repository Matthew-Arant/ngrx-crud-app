import { createReducer, on } from "@ngrx/store";
import { AssociateState } from "./Associate.State";
import { loadAssociateFailure, loadAssociateSuccess } from "./Associate.Action";

const AssociateReducer = createReducer(AssociateState,
    on(loadAssociateSuccess, (state, action) => {
        return {
            ...state,
            list: action.list,
            errormessage: ''
        }
    }),
    on(loadAssociateFailure, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    })
    )


export function associateReducer(state: any, action: any) {
    return AssociateReducer(state, action)
}