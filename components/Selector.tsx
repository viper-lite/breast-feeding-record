import { forwardRef, useImperativeHandle, useState } from "react";
import {
  ViewProps,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from "react-native";

interface SelectorProps extends ViewProps {
  items: any[];
  onSelectedChanged: (value: any) => void;
}

export interface SelectorRef {
  reset: () => void;
}

const Selector = forwardRef<SelectorRef, SelectorProps>((props, ref) => {
  const [selected, setSelected] = useState(-1);
  useImperativeHandle(ref, () => ({
    reset() {
      setSelected(-1);
    },
  }));
  return (
    <View style={styles.container}>
      {props.items.map((value, index) => {
        return (
          <TouchableHighlight
            key={index}
            onPress={() => {
              setSelected(index);
              props &&
                props.onSelectedChanged &&
                props.onSelectedChanged(value);
            }}
          >
            <View style={selected == index ? styles.selected : styles.normal}>
              <Text style={{ fontSize: 20 }}>{value}</Text>
            </View>
          </TouchableHighlight>
        );
      })}
    </View>
  );
});

export default Selector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selected: {
    borderColor: "black",
    backgroundColor: "red",
    borderWidth: 2,
    borderRadius: 4,
    padding: 4,
    margin: 4,
  },
  normal: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 4,
    padding: 4,
    margin: 4,
  },
});
