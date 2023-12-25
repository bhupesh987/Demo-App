import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import RenderItems from './RenderItems';
import EmptyList from './EmptyList';
import {COLORS} from '../Assets';

const RestaurantList = ({data = [], handleEndReached, loadingMore = false}) => {
  return (
    <>
      <FlatList
        data={data}
        renderItem={({index, item}) => (
          <RenderItems item={item} index={index} key={`renderItems${index}`} />
        )}
        keyExtractor={(_, index) => `${index?.toString()}`}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={EmptyList}
        ListFooterComponent={() =>
          loadingMore && (
            <ActivityIndicator size={'small'} color={COLORS.primary} />
          )
        }
      />
    </>
  );
};

export default RestaurantList;

const styles = StyleSheet.create({
  list: {
    padding: 20,
    paddingBottom: '30%',
  },
});
