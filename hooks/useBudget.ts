import { BudgetLimit, TipeBudget } from "@/types/types";

import { storageUtils } from "@/utils/storage";
import { create } from "zustand";

interface BudgetState {
    budgetData: TipeBudget;
    dapat: () => Promise<void>;
    simpan: (budget: TipeBudget) => Promise<void>;
    setLimit: (month: string, limit: BudgetLimit, apakahDefault: boolean) => Promise<void>;
    hapusSemuaBudget: () => Promise<void>
}
  
export const useBudget = create<BudgetState>((set, get) => ({
    budgetData: { budget: {}, default: {} },
    loading: false,
    dapat: async () => {
      let data = await storageUtils.loadBudgetData();
      if(data.budget === undefined) {
        data.budget = {}
      }
      if(data.default === undefined) {
        data.default = {}
      }

      set({ budgetData: data });
    },
    simpan: async (budget) => {
      await storageUtils.saveBudgetData(budget);
      set({ budgetData: budget });
    },
    setLimit: async (month, limit, apakahDefault = false) => {
      let data = get().budgetData;

      if(apakahDefault) {
        data.default[limit.categoryId] = limit.amount;
      } else {
        delete data.default[limit.categoryId];
      }

      if(data.budget[month] === undefined) {
        data.budget[month] = [];
      }

      if(limit.amount > 0) {
        const idx = data.budget[month].findIndex(l => l.categoryId === limit.categoryId);
        if(idx !== -1) {
          data.budget[month][idx] = limit;
        } else {
          data.budget[month].push(limit);
        }
      } else {
        data.budget[month] = data.budget[month].filter((v) => v.categoryId !== limit.categoryId);
      }

      await storageUtils.saveBudgetData(data);
      set({ budgetData: { ...data } });
    },
    hapusSemuaBudget: async () => {
      await storageUtils.saveBudgetData({ budget: {}, default: {} });
      set({ budgetData: {budget: {}, default: {}} });
    }
}));