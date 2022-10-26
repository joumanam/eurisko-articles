import { View, Text, StyleSheet, ActivityIndicator, FlatList, RefreshControl, ImageBackground } from 'react-native';
import React, { useEffect, useState, useRef } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/rtkHooks';
import SearchInput from '../components/SearchInput';
import { Colors } from '../config/Colors';
import Button from '../components/Button';
import { fetchArticles } from '../api/api';
import { setArticles, setFilteredArticles, Article } from '../redux/articlesSlice';
import ArticleCard from '../components/ArticleCard';
import AsyncStorage from '@react-native-community/async-storage';
import { setUser } from '../redux/userSlice';

export default function Dashboard() {
  const user = useAppSelector((store) => store.user);
  const articles = useAppSelector((store) => store.articles)

  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0)
  const [articleList, setArticleList] = useState<Article[]>([])
  const [searchedArticles, setSearchedArticles] = useState<Article[]>([])
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  useEffect(() => {
    getArticles()
  }, [page])

  const getArticles = async () => {
    if (page == 0) {
      setLoading(true)
    }
    fetchArticles(page)
      .then(async (response: any) => {
        if (response.response.docs.length < 10) {
          setDataFetched(true)
        }
        setArticleList([...articleList, ...response.response.docs])
        dispatch(setArticles(articleList));
        console.log(articleList)
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false))
  }

  const searchArticles = () => {
    if (search) {
      let regex = new RegExp(search, 'i');
      setSearchedArticles(articleList.filter(item => item.headline.main.match(regex) || item.lead_paragraph.match(regex)))
      dispatch(setFilteredArticles(searchedArticles));
    }
  }

  const onLogout = async () => {
    await AsyncStorage.setItem("token", "")
    dispatch(setUser({ username: null, accessToken: null }));
  }

  useEffect(() => {
    searchArticles()
  }, [search])

  const header = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Welcome {user.user?.username}!</Text>
          <View style={styles.logoutButtonContainer}>
            <Button label="Logout" style={styles.logoutButton} type="secondary" onPress={onLogout} />
          </View>
        </View>
        <SearchInput value={search} onChangeText={val => setSearch(val)} onPressClear={() => setSearch('')} />
      </View>
    )
  }

  const showLoader = () => {
    return (
      <ActivityIndicator color={Colors.red} size="large" />
    )
  }

  const body = () => {
    return (
      loading ? showLoader()
        :
        <View>
          <FlatList
            style={{ marginBottom: 20 }}
            showsVerticalScrollIndicator={false}
            data={search ? searchedArticles : articleList}
            keyExtractor={item => `${item._id}-${Math.random()}`}
            onEndReachedThreshold={0}
            onEndReached={async ({ distanceFromEnd }) => {
              if (distanceFromEnd < 0) {
                return;
              };
              if (!search) {
                setPage(page + 1)
              }
            }}
            refreshControl={
              <RefreshControl
                enabled={!search}
                refreshing={loading}
                onRefresh={async () => {
                  setArticleList([]);     // we are resetting the list so it doesn't concatenate the same data again
                  setDataFetched(false)   // resetting dataFetched to false so the loading indicator shows again on end reached 
                  setPage(0)
                }}
                tintColor={Colors.red}
              />
            }
            ListFooterComponent={!dataFetched && !search ? showLoader() : null}
            renderItem={({ item }) => (
              <ArticleCard
                title={item?.headline.main ? item.headline.main : "No Title Provided"}
                author={item?.byline?.original ? item?.byline.original : "Unknown Author"}
                description={item.lead_paragraph ? item.lead_paragraph : "No Description Provided"} />

            )}
          />
        </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {header()}
      <ImageBackground source={require("../../assets/background2.jpg")} resizeMode="stretch" style={styles.container}>
        <View style={styles.container}>
          {body()}
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1
  },
  headerContainer: {
    backgroundColor: Colors.red,
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3

  },
  headerTitle: {
    color: Colors.whiteBlue,
    fontSize: 24,
    fontWeight: '500',
    paddingVertical: 10,
  },
  logoutButtonContainer: {
    width: "30%",
    marginLeft: 'auto'
  },
  logoutButton: {

  }
})