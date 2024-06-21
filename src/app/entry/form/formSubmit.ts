import { toast } from "sonner";
import { store } from "../data/store";
import { submitFormData } from "../data/query";
import { resetEntry } from "../data/entrySlice";
import { resetWeight } from "../data/weightSlice";

export const formSubmit = async (e: { preventDefault: () => void; } , eventTrue: boolean = true) => {
    const entryData = store.getState().entryReducer
    const weights = store.getState().weightReducer
    const dispatch = (data) => store.dispatch(data)
    // e.preventDefault();
    if(eventTrue){
    e.preventDefault();
    }
    const data = { ...entryData, ...weights }
    const response = await submitFormData(data)
    if (!response.success) {
        toast.error("error while submitting form")
    }
    if (response.success) {
        toast.success('your form success submitted')
    }
    dispatch(resetEntry())
    dispatch(resetWeight())
    const Element = document.querySelector(`[data-autofocus='true']`);
    Element.focus();
    return
}