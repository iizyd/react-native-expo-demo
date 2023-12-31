import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Button,
  useTheme,
  Icon,
  Text,
  Tab,
  Dialog,
} from "@rneui/themed";
import { View, ScrollView } from "react-native";
import MyCard from "./Card";
import MainSpider from "../../spider/Index";
import { BookItem, CategoryItem } from "../../spider/types";

export default function Home({ navigation }: { navigation: any }): JSX.Element {
  const { theme } = useTheme();
  const styles = useStyles();

  const [activeIndex, setActiveIndex] = useState(0);
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [bookList, setBookList] = useState<BookItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [mainSpider] = useState(new MainSpider());

  useEffect(() => {
    setIsLoading(true);
    console.log("正在获取分类列表--->");
    mainSpider
      .getCategoryList()
      .then((res) => {
        console.log("获取分类列表：", res.length);
        setCategoryList(res);
        getBookList();
      })
      .finally(() => setIsLoading(false));
  }, [mainSpider]);

  useEffect(() => {
    getBookList();
  }, [activeIndex, categoryList]);

  function getBookList() {
    if (categoryList.length) {
      setIsLoading(true);
      console.log("正在获书籍列表--->");
      mainSpider
        .getCategoryBookList(categoryList[activeIndex].path)
        .then((res) => {
          console.log("获取书列表:", res.length);
          setBookList(res);
        })
        .finally(() => setIsLoading(false));
    }
  }

  return (
    <View style={styles.homeContainer}>
      <View style={styles.topBar}>
        <Text style={{ color: theme.colors.white, fontSize: 18 }}>
          我要听书
        </Text>
        <View style={styles.searchBtnView}>
          <Button
            type="clear"
            size="sm"
            onPress={() => navigation.navigate("SearchPage")}
          >
            <Icon name="search" type="ionicon" color={theme.colors.white} />
          </Button>
        </View>
      </View>

      <View style={styles.typeView}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <Tab
            value={activeIndex}
            onChange={(e) => {
              setActiveIndex(e);
            }}
            indicatorStyle={{
              backgroundColor: theme.colors.primary,
              height: 3,
            }}
            variant="primary"
          >
            {categoryList.map((item, index) => (
              <Tab.Item
                key={index}
                title={item.name}
                titleStyle={{ fontSize: 13, color: theme.colors.grey1 }}
                buttonStyle={{ backgroundColor: "white" }}
              />
            ))}
          </Tab>
        </ScrollView>
      </View>

      <MyCard bookList={bookList} />

      <Dialog isVisible={isLoading}>
        <Dialog.Loading />
      </Dialog>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  homeContainer: {
    flex: 1,
    display: "flex",
  },
  topBar: {
    width: "100%",
    height: 60,
    backgroundColor: theme.colors.primary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 5,
    paddingLeft: 20,
  },
  searchBtnView: {
    width: 40,
  },
  typeView: {
    display: "flex",
    height: 48,
  },
  typeItem: {
    padding: 10,
  },
}));
