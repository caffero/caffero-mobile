import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackNavigator, RootStackParamList } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import Screen from '../components/Screen';
import { GetPost } from '../api/models/Post';
import { spacing } from '../theme';
import { usePostService } from '../api/services/postService';

type PostDetailScreenRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;

export const PostDetailScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const route = useRoute<PostDetailScreenRouteProp>();
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const postService = usePostService();
  
  const [post, setPost] = useState<GetPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getById(route.params.id);
        setPost(data);
        setLikeCount(data.likeCount);
        setDislikeCount(data.dislikeCount);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [route.params.id]);

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

  if (isLoading || !post) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header
          title={getText('appName')}
          showBack
          onBack={() => navigation.goBack()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('appName')}
        showBack
        onBack={() => navigation.goBack()}
        rightIcon="edit"
        onRightPress={() => navigation.navigate('UpdatePost', { id: post.id })}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.postTitle, { color: theme.colors.text.primary }]}>
          {post.title}
        </Text>
        <Image 
          source={{ uri: post.imageUrl || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085' }} 
          style={styles.image} 
        />
        <Text style={[styles.postContent, { color: theme.colors.text.primary }]}>
          {post.description}
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
  content: {
    padding: spacing.md,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: spacing.md,
    lineHeight: 32,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: spacing.md,
    borderRadius: 8,
  },
  postContent: {
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 