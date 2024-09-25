import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";
import Selector, { SelectorRef } from "@/components/Selector";
import StorageUtil from "@/utils/StorageUtil";
import DateUtil from "@/utils/DateUtil";
import { SafeAreaView } from "react-native-safe-area-context";
import { Snackbar } from "react-native-paper";

export default function HomeScreen() {
  const [selectedAppetite, setSelectedAppetite] = useState(-1);
  const selectorRef = useRef<SelectorRef>(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState({
    date: DateUtil.getCurrentDate(),
    time: DateUtil.getCurrentTime(),
    days: DateUtil.getCurrentDays(),
  });
  useEffect(() => {
    setInterval(() => {
      setStatus({
        date: DateUtil.getCurrentDate(),
        time: DateUtil.getCurrentTime(),
        days: DateUtil.getCurrentDays(),
      });
    }, 500);
    return function cleanup() {};
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title_container}>
        <Text style={styles.title}>当前日期：{status.date}</Text>
        <Text style={styles.title}>当前时间：{status.time}</Text>
        <Text style={styles.title}>大宝出生已经：{status.days}天</Text>
      </View>
      <View style={styles.selector_container}>
        <Selector
          ref={selectorRef}
          items={[
            10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150,
            160,
          ]}
          onSelectedChanged={(value) => {
            setSelectedAppetite(value);
          }}
        />
      </View>
      <View style={styles.button_group}>
        <View style={styles.button_container}>
          <Button
            title="母乳喂养"
            onPress={async () => {
              StorageUtil.insertOrUpdate({
                timestamp: DateUtil.getCurrentTimestamp(),
                days: DateUtil.getCurrentDays(),
                value: -1,
                type: "母乳",
              }).then(
                () => {},
                (e) => {}
              );
              selectorRef.current?.reset();
              setVisible(true);
            }}
          />
        </View>
        <View style={styles.button_container}>
          <Button
            title="奶粉喂养"
            onPress={() => {
              if (selectedAppetite < 0) {
                return;
              }
              StorageUtil.insertOrUpdate({
                timestamp: DateUtil.getCurrentTimestamp(),
                days: DateUtil.getCurrentDays(),
                value: selectedAppetite,
                type: "奶粉",
              }).then(
                () => {},
                (e) => {}
              );
              selectorRef.current?.reset();
              setVisible(true);
            }}
          />
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(!visible)}
        duration={2000}
      >
        已保存
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title_container: {
    margin: 8,
  },
  title: {
    fontSize: 22,
  },
  selector_container: {
    margin: 8,
  },
  button_group: {
    flexDirection: "row",
  },
  button_container: {
    margin: 4,
    flex: 1,
  },
});
