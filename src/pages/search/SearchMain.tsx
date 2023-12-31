import { Button, makeStyles, useTheme } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import ResultList from "./ResultList";
import { BookItem } from "../../spider/types";

interface Prop {
  bookList: BookItem[];
}

export default function SearchMain({ bookList }: Prop): JSX.Element {
  const styles = useStyles();
  // const { theme } = useTheme();
  // const data = [...Array(1)];
  // const [activeId, setActiveId] = useState(0);
  return (
    <View style={styles.main}>
      {/* <View style={styles.leftContainer}>
        <ScrollView style={{ paddingTop: 5, paddingBottom: 50 }}>
          {data.map((item, index) => (
            <View
              key={index}
              style={{
                ...styles.listItem,
                paddingBottom: index === data.length - 1 ? 20 : 0,
              }}
            >
              <Button
                type={activeId === index ? "solid" : "outline"}
                onPress={() => setActiveId(index)}
              >
                22听书网22听
              </Button>
            </View>
          ))}
        </ScrollView>
      </View> */}

      <View style={styles.rightContainer}>
        <ResultList bookList={bookList} />
      </View>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    flex: 1,
    flexDirection: "row",
  },
  leftContainer: {
    width: 100,
    borderRightWidth: 1,
    borderRightColor: theme.colors.grey5,
  },
  rightContainer: {
    flex: 1,
  },
  listItem: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
}));
