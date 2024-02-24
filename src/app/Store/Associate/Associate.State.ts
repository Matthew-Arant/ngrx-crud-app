import { AssociateModel } from "../Model/associate.model";

export const AssociateState: AssociateModel = {
    list: [],
    errormessage: '',
    associateobject: {
        id: 0,
        name: "",
        email: "",
        phone: "",
        type: "CUSTOMER",
        address: "",
        associategroup: "level1",
        status: true
    },

}