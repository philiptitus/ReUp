import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo } from "react"
import { SafeAreaView } from 'react-native';
import MapViewComponent from "./DemoShowroomScreen/components/Map";
import {
  AccessibilityProps,
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { type ContentStyle } from "@shopify/flash-list"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import {
  Button,
  ButtonAccessoryProps,
  Card,
  EmptyState,
  Icon,
  ListView,
  Screen,
  Text,
  Toggle,
} from "../components"
import { isRTL, translate } from "../i18n"
import { useStores } from "../models"
import { Episode } from "../models/Episode"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import { delay } from "../utils/delay"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"

const ICON_SIZE = 14

const rnrImage1 = require("../../assets/images/demo/rnr-image-1.png")
const rnrImage2 = require("../../assets/images/demo/rnr-image-2.png")
const rnrImage3 = require("../../assets/images/demo/rnr-image-3.png")
const rnrImages = [rnrImage1, rnrImage2, rnrImage3]

export const DemoPodcastListScreen: FC<DemoTabScreenProps<"DemoPodcastList">> = observer(
  function DemoPodcastListScreen(_props) {
    const { episodeStore } = useStores()

    const [refreshing, setRefreshing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    // initially, kick off a background refresh without the refreshing UI
    useEffect(() => {
      ;(async function load() {
        setIsLoading(true)
        await episodeStore.fetchEpisodes()
        setIsLoading(false)
      })()
    }, [episodeStore])

    // simulate a longer refresh, if the refresh is too fast for UX
    async function manualRefresh() {
      setRefreshing(true)
      await Promise.all([episodeStore.fetchEpisodes(), delay(750)])
      setRefreshing(false)
    }

    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >
        <ListView<Episode>
          contentContainerStyle={$listContentContainer}
          data={episodeStore.episodesForList.slice()}
          extraData={episodeStore.favorites.length + episodeStore.episodes.length}
          refreshing={refreshing}
          estimatedItemSize={177}
          onRefresh={manualRefresh}
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator />
            ) : (
              <EmptyState
                preset="generic"
                style={$emptyState}
                headingTx={
                  episodeStore.favoritesOnly
                    ? "demoPodcastListScreen.noFavoritesEmptyState.heading"
                    : undefined
                }
                contentTx={
                  episodeStore.favoritesOnly
                    ? "demoPodcastListScreen.noFavoritesEmptyState.content"
                    : undefined
                }
                button={episodeStore.favoritesOnly ? "" : undefined}
                buttonOnPress={manualRefresh}
                imageStyle={$emptyStateImage}
                ImageProps={{ resizeMode: "contain" }}
              />
            )
          }
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="heading">

                This Functionality Is Still In Development. Coming Soon!
              </Text>



              {/* {(episodeStore.favoritesOnly || episodeStore.episodesForList.length > 0) && (
                <View style={$toggle}>
                  <Toggle
                    value={episodeStore.favoritesOnly}
                    onValueChange={() =>
                      episodeStore.setProp("favoritesOnly", !episodeStore.favoritesOnly)
                    }
                    variant="switch"
                    labelTx="demoPodcastListScreen.onlyFavorites"
                    labelPosition="left"
                    labelStyle={$labelStyle}
                    accessibilityLabel={translate("demoPodcastListScreen.accessibility.switch")}
                  />
                </View>
              )} */}
            </View>
          }
          // renderItem={({ item }) => (
          //   <EpisodeCard
          //     episode={item}
          //     isFavorite={episodeStore.hasFavorite(item)}
          //     onPressFavorite={() => episodeStore.toggleFavorite(item)}
          //   />
          // )}
        />
              <MapViewComponent />

      </Screen>
    )
  },
)


// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
}

const $item: ViewStyle = {
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
}

const $itemThumbnail: ImageStyle = {
  marginTop: spacing.sm,
  borderRadius: 50,
  alignSelf: "flex-start",
}

const $toggle: ViewStyle = {
  marginTop: spacing.md,
}

const $labelStyle: TextStyle = {
  textAlign: "left",
}

const $iconContainer: ViewStyle = {
  height: ICON_SIZE,
  width: ICON_SIZE,
  flexDirection: "row",
  marginEnd: spacing.sm,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  marginTop: spacing.xs,
  flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
}

const $favoriteButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.md,
  justifyContent: "flex-start",
  backgroundColor: colors.palette.neutral300,
  borderColor: colors.palette.neutral300,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxs,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: "flex-start",
}

const $unFavoriteButton: ViewStyle = {
  borderColor: colors.palette.primary100,
  backgroundColor: colors.palette.primary100,
}

const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
// #endregion

// @demo remove-file
