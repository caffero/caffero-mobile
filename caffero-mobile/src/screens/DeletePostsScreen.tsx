import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Screen from '../components/Screen';
import { Post } from '../api/models/Post';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Dummy data
const postList: Post[] = [
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

export const DeletePostsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getText } = useLanguage();
  const { theme } = useTheme();
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());

  const togglePostSelection = (id: string) => {
    const newSelection = new Set(selectedPosts);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedPosts(newSelection);
  };

  const handleDelete = () => {
    if (selectedPosts.size === 0) {
      Alert.alert(getText('error'), getText('deleteError'));
      return;
    }

    Alert.alert(
      getText('confirmDelete'),
      getText('confirmDeleteMessage').replace('{count}', selectedPosts.size.toString()),
      [
        { text: getText('cancel'), style: 'cancel' },
        {
          text: getText('delete'),
          style: 'destructive',
          onPress: () => {
            // Delete logic here
            Alert.alert(
              getText('success'),
              getText('postDeleted'),
              [{ text: getText('ok'), onPress: () => navigation.goBack() }]
            );
          },
        },
      ]
    );
  };

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={[styles.postCard, { 
        backgroundColor: theme.colors.surface.primary,
        shadowColor: theme.colors.text.primary,
      }]}
      onPress={() => togglePostSelection(item.id)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      <View style={styles.postInfo}>
        <Text style={[styles.postTitle, { color: theme.colors.text.primary }]}>
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
      <View style={[styles.checkboxContainer, { backgroundColor: theme.colors.surface.primary }]}>
        <Icon
          name={selectedPosts.has(item.id) ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={selectedPosts.has(item.id) ? theme.colors.primary.main : theme.colors.text.secondary}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('deletePosts')}
        showBack
        onBack={() => navigation.goBack()}
      />
      <FlatList
        data={postList}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={[
          styles.deleteButton,
          { 
            backgroundColor: theme.colors.status.error,
            opacity: selectedPosts.size > 0 ? 1 : 0.5 
          }
        ]}
        onPress={handleDelete}
        disabled={selectedPosts.size === 0}
      >
        <Text style={[styles.deleteButtonText, { color: theme.colors.text.inverse }]}>
          {getText('delete')}
        </Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 8,
  },
  postCard: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  postImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  postInfo: {
    padding: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
  },
  checkboxContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 4,
    padding: 4,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 