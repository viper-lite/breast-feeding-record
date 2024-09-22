import AsyncStorage from "@react-native-async-storage/async-storage";

export interface RecordItem {
  timestamp: number;
  days: number;
  value: number;
  type: string;
}

const SAVED_KEY = "bfr_records";

export default {
  insertOrUpdate(item: RecordItem) {
    return new Promise(async (resolve, reject) => {
      try {
        const value = await AsyncStorage.getItem(SAVED_KEY);
        let last: RecordItem[] = [];
        if (value != null) {
          last = JSON.parse(value);
        }
        last.push(item);
        await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(last, null, 2));
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
        const value = await AsyncStorage.getItem(SAVED_KEY);
        if (value !== null) {
          // value previously stored
          const list: RecordItem[] = JSON.parse(value);
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
