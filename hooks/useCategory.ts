import { Category } from "@/types/types";

import { storageUtils } from "@/utils/storage";
import { create } from "zustand";

interface KategoriState {
    kategori: Category[],
    dapat: () => Promise<void>;
    simpan: (kategori: Category) => Promise<void>;
    update: (kategori: Category) => Promise<void>;
    hapus: (id: string) => Promise<void>;
    hapusSemua: () => Promise<void>;
}

export const useKategori = create<KategoriState>((set, get) => ({
    kategori: [],
    dapat: async () => {
        const kategori = await storageUtils.dapatinCustomKategori();
        set({ kategori: kategori });
    },
    simpan: async (k) => {
        const kategori = await storageUtils.simpanCustomKategori(k);
        set({ kategori: kategori });
    },
    update: async (k) => {
        const kategori = await storageUtils.updateCustomKategori(k);
        set({ kategori: kategori });
    },
    hapus: async (id) => {
        const kategori = await storageUtils.hapusCustomKategori(id);
        set({ kategori: kategori });
    },
    hapusSemua: async () => {
        await storageUtils.hapusSemuaCustomKategori();
        set({ kategori: [] });
    }
}))