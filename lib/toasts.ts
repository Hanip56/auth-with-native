import { toast } from "sonner";

export const toastSuccess = (title: string, desc: string = "") => {
  toast(title, {
    description: desc,
    classNames: {
      title: "text-main-1 font-semibold",
      description: "text-slate-600",
    },
  });
};
