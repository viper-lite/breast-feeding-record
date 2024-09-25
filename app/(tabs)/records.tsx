import { StyleSheet, Button, View, Text } from "react-native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import StorageUtil, { RecordItem } from "@/utils/StorageUtil";
import DateUtil from "@/utils/DateUtil";
import { SafeAreaView } from "react-native-safe-area-context";

const renderItem: ListRenderItem<RecordItem> = ({ item }) => {
  return (
    <View style={styles.list_item}>
      <Text>
        {DateUtil.formatTimeStamp(item.timestamp) + " " + item.days + "天"}
      </Text>

      <View style={styles.item_part}>
        <Text>
          {item.type} {item.value >= 0 ? item.value : ""}
        </Text>
      </View>
    </View>
  );
};

export default function SettingsScreen() {
  const [data, setData] = useState<RecordItem[]>([]);
  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return item.timestamp + "/" + index;
        }}
        estimatedItemSize={200}
      />
      <Button
        title="刷新"
        onPress={() => {
          StorageUtil.getPagedRecordList().then(
            (list) => {
              setData(list);
            },
            (err) => {
              console.log(err);
            }
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list_item: {
    margin: 8,
  },
  item_part: {
    flexDirection: "row",
  },
});
