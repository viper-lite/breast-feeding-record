import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

export interface RecordItem {
  timestamp: number;
  days: number;
  value: number;
  type: string;
}

const SAVED_KEY = "bfr_records";
let supabase: any;

export default {
  init() {
    supabase = createClient(
      process.env.EXPO_PUBLIC_SUPABASE_URL || "",
      process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
      {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      }
    );
  },
  insertOrUpdate(item: RecordItem) {
    return new Promise(async (resolve, reject) => {
      try {
        const { error } = await supabase.from(SAVED_KEY).insert(item);
        if (error) {
          throw error;
        }
        resolve([]);
      } catch (e) {
        // saving error
        // AsyncStorage.clear();
        reject(e);
      }
    });
  },
  getPagedRecordList(): Promise<RecordItem[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, error } = await supabase.from(SAVED_KEY).select();
        if (error) {
          throw error;
        }
        if (data) {
          const list: RecordItem[] = data;
          resolve(list.reverse());
        } else {
          resolve([]);
        }
      } catch (e) {
        reject(e);
      }
    });
  },
};
