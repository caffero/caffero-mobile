import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackNavigator, RootStackParamList } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import Screen from '../components/Screen';
import { Post } from '../api/models/Post';
import { spacing } from '../theme';

// Dummy data - replace with API call
const post: Post = {
  id: '1',
  title: 'My First Coffee Experience',
  content: 'Today I tried a new Ethiopian coffee and it was an amazing experience. The fruity notes and floral aroma were absolutely stunning. I used my trusty V60 dripper with a medium-fine grind setting. The brewing process took about 3 minutes and the result was a clean, bright cup with hints of bergamot and jasmine.',
  imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
  likeCount: 12,
  dislikeCount: 2,
};

type PostDetailScreenRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;

export const PostDetailScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const route = useRoute<PostDetailScreenRouteProp>();
  const { theme } = useTheme();
  const { getText } = useLanguage();
  
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [dislikeCount, setDislikeCount] = useState(post.dislikeCount);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
      setLiked(false);
    } else {
      if (disliked) {
        setDislikeCount(prev => prev - 1);
        setDisliked(false);
      }
      setLikeCount(prev => prev + 1);
      setLiked(true);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikeCount(prev => prev - 1);
      setDisliked(false);
    } else {
      if (liked) {
        setLikeCount(prev => prev - 1);
        setLiked(false);
      }
      setDislikeCount(prev => prev + 1);
      setDisliked(true);
    }
  };

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={post.title}
        showBack
        onBack={() => navigation.goBack()}
        rightIcon="edit"
        onRightPress={() => navigation.navigate('UpdatePost', { id: post.id })}
        titleStyle={styles.headerTitle}
        containerStyle={styles.headerContainer}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
        <Text style={[styles.content, { color: theme.colors.text.primary }]}>
          {post.content}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, liked && styles.actionButtonActive]}
            onPress={handleLike}
          >
            <Icon
              name={liked ? 'thumb-up' : 'thumb-up-off-alt'}
              size={24}
              color={liked ? theme.colors.primary.main : theme.colors.text.secondary}
            />
            <Text
              style={[
                styles.actionText,
                { color: liked ? theme.colors.primary.main : theme.colors.text.secondary },
              ]}
            >
              {likeCount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, disliked && styles.actionButtonActive]}
            onPress={handleDislike}
          >
            <Icon
              name={disliked ? 'thumb-down' : 'thumb-down-off-alt'}
              size={24}
              color={disliked ? theme.colors.primary.main : theme.colors.text.secondary}
            />
            <Text
              style={[
                styles.actionText,
                { color: disliked ? theme.colors.primary.main : theme.colors.text.secondary },
              ]}
            >
              {dislikeCount}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 56,
    height: 'auto',
    paddingVertical: 8,
  },
  headerTitle: {
    flexShrink: 1,
    marginHorizontal: 16,
    textAlign: 'center',
  },
  content: {
    padding: spacing.md,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: spacing.md,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginHorizontal: spacing.md,
  },
  actionButtonActive: {
    transform: [{ scale: 1.1 }],
  },
  actionText: {
    marginLeft: spacing.sm,
    fontSize: 16,
    fontWeight: '500',
  },
}); 