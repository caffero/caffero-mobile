import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackNavigator } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import Screen from '../components/Screen';
import { Post } from '../api/models/Post';
import { spacing, borderRadius } from '../theme';

// Dummy data - replace with API call
const posts: Post[] = [
  {
    id: '1',
    title: 'My First Coffee Experience',
    content: 'Today I tried a new Ethiopian coffee...',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    likeCount: 12,
    dislikeCount: 2,
  },
  {
    id: '2',
    title: 'Perfect Morning Brew',
    content: 'The secret to a perfect morning brew...',
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348',
    likeCount: 8,
    dislikeCount: 1,
  },
];

export const WhatIThinkScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const { theme } = useTheme();
  const { getText } = useLanguage();

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={[styles.postCard, { backgroundColor: theme.colors.surface.primary }]}
      onPress={() => navigation.navigate('PostDetail', { id: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      <View style={styles.postContent}>
        <Text style={[styles.postTitle, { color: theme.colors.text.primary }]} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.postStats}>
          <View style={styles.statContainer}>
            <Icon name="thumb-up" size={16} color={theme.colors.text.secondary} />
            <Text style={[styles.statText, { color: theme.colors.text.secondary }]}>
              {item.likeCount}
            </Text>
          </View>
          <View style={styles.statContainer}>
            <Icon name="thumb-down" size={16} color={theme.colors.text.secondary} />
            <Text style={[styles.statText, { color: theme.colors.text.secondary }]}>
              {item.dislikeCount}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('whatIThink')}
        rightIcon="delete"
        onRightPress={() => navigation.navigate('DeletePosts')}
      />
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary.main }]}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Icon name="add" size={24} color={theme.colors.primary.contrastText} />
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: spacing.md,
  },
  postCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  postContent: {
    padding: spacing.md,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  statText: {
    marginLeft: spacing.xs,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
}); 
