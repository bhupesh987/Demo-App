import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {COLORS, FONTS, IMAGES} from '../Assets/index';
import Animated, {FadeInLeft, FadeInRight} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/core';
import {DUMMY_IMAGE, GOOGLE_IMAGE} from '../Constants';
import {Rating} from 'react-native-ratings';

const RenderItems = memo(
  ({item, index}) => {
    const navigation = useNavigation();

    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('ItemDetail', {data: item})}>
        <Animated.View
          key={`newsHeadline${index}`}
          style={styles.container}
          entering={FadeInLeft.delay(index * 10)}
          exiting={FadeInRight.delay(index * 20)}>
          <Image
            resizeMode={'cover'}
            source={{
              uri: item?.photos
                ? GOOGLE_IMAGE(item?.photos[0]?.photo_reference)
                : DUMMY_IMAGE,
            }}
            style={styles.imageIcon}
          />
          <View style={styles.body}>
            <View style={styles.innerBody}>
              <Text style={styles.titleText}>{item?.name}</Text>
              <View style={styles.starView}>
                <Rating
                  ratingCount={5}
                  startingValue={Math.round(item?.rating)}
                  imageSize={18}
                  readonly
                  tintColor={COLORS.lightGrey}
                />
              </View>
            </View>
            <View style={styles.iconBox}>
              <Image
                source={IMAGES.location}
                resizeMode={'contain'}
                style={styles.icon}
              />
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  },
  (prev, next) => prev?.item?.name === next?.item?.name,
);

export default RenderItems;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    elevation: 1,
    marginHorizontal: 5,
    marginBottom: 15,
    flexDirection: 'row',
  },
  titleText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.black,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  imageIcon: {
    height: 70,
    width: 70,
    borderRadius: 10,
  },
  icon: {
    height: 15,
    width: 15,
    tintColor: COLORS.white,
  },
  iconBox: {
    padding: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    alignSelf: 'center',
  },
  innerBody: {
    flex: 1,
    padding: 5,
    paddingLeft: 20,
    justifyContent: 'flex-start',
  },
  starIcon: {
    height: 15,
    width: 15,
  },
  starView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
