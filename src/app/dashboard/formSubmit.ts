import { toast } from "sonner";
import { store } from "./store";
import { submitDashboard } from "./query";

export const formSubmit = async (e: { preventDefault: () => void; }, eventTrue: boolean = true) => {
  const datas = store.getState().filterDataReducer
  if (eventTrue) {
    e.preventDefault();
  }
  const response = await submitDashboard(datas)
  if (!response.success) {
    toast.error("error while submitting form")
  }
  if (response.success) {
    toast.success('your form success submitted')
    window.location.href = '/dashboard'
  }

  return
}
