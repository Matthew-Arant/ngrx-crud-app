import { createReducer, on } from "@ngrx/store";
import { AssociateState } from "./Associate.State";
import { addAssociateSuccess, deleteAssociateSuccess, getAssociateSuccess, loadAssociateFailure, loadAssociateSuccess, openPopup, updateAssociateSuccess } from "./Associate.Action";

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
    }),
    on(addAssociateSuccess, (state, action) => {
        const maxID = Math.max(...state.list.map(o => o.id));
        const newData = {...action.inputData};
        newData.id = maxID + 1;
        return {
            ...state,
            associateobject: newData,
            errormessage: ''
        }
    }),
    on(getAssociateSuccess, (state, action) => {
        return {
            ...state,
            associateobject: action.obj,
            errormessage: ''
        }
    }),
    on(openPopup, (state, action) => {
        return {
            ...state,
            associateobject: {
                id: 0,
                name: "",
                email: "",
                phone: "",
                type: "CUSTOMER",
                address: "",
                associategroup: "level1",
                status: true
            }
        }
    }),
    on(updateAssociateSuccess, (state, action) => {
        const newData = state.list.map(o => {
            return o.id === action.inputData.id ? action.inputData : o
        })
        return {
            ...state,
            list: newData,
            errormessage: ''
        }
    }),
    on(deleteAssociateSuccess, (state, action) => {
        const newData = state.list.filter(o => o.id !== action.code)
        return {
            ...state,
            list: newData,
            errormessage: ''
        }
    })
)


export function associateReducer(state: any, action: any) {
    return AssociateReducer(state, action)
}