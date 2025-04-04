import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackNavigator, RootStackParamList } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import Screen from '../components/Screen';
import { Post } from '../api/models/Post';
import { spacing, borderRadius } from '../theme';

// Dummy data - replace with API call
const post: Post = {
  id: '1',
  title: 'My First Coffee Experience',
  content: 'Today I tried a new Ethiopian coffee and it was an amazing experience. The fruity notes and floral aroma were absolutely stunning.',
  imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
  likeCount: 12,
  dislikeCount: 2,
};

type UpdatePostScreenRouteProp = RouteProp<RootStackParamList, 'UpdatePost'>;

export const UpdatePostScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const route = useRoute<UpdatePostScreenRouteProp>();
  const { theme } = useTheme();
  const { getText } = useLanguage();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);

  useEffect(() => {
    // TODO: Fetch post data using route.params.id
  }, [route.params.id]);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert(getText('error'), getText('fillRequiredFields'));
      return;
    }

    // TODO: Implement post update API call
    Alert.alert(getText('success'), getText('postUpdated'), [
      { text: getText('ok'), onPress: () => navigation.goBack() },
    ]);
  };

  const handleAddImage = () => {
    // TODO: Implement image picker
    setImageUrl('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085');
  };

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('updatePost')}
        showBack
        onBack={() => navigation.goBack()}
        rightIcon="check"
        onRightPress={handleSubmit}
      />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          style={[
            styles.titleInput,
            {
              backgroundColor: theme.colors.surface.primary,
              color: theme.colors.text.primary,
              borderColor: theme.colors.border.primary,
            },
          ]}
          placeholder={getText('enterPostTitle')}
          placeholderTextColor={theme.colors.text.secondary}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[
            styles.contentInput,
            {
              backgroundColor: theme.colors.surface.primary,
              color: theme.colors.text.primary,
              borderColor: theme.colors.border.primary,
            },
          ]}
          placeholder={getText('enterPostContent')}
          placeholderTextColor={theme.colors.text.secondary}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
        {imageUrl ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <TouchableOpacity
              style={[styles.removeImage, { backgroundColor: theme.colors.status.error }]}
              onPress={() => setImageUrl('')}
            >
              <Icon name="close" size={20} color={theme.colors.text.inverse} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.addImage,
              {
                backgroundColor: theme.colors.surface.primary,
                borderColor: theme.colors.border.primary,
              },
            ]}
            onPress={handleAddImage}
          >
            <Icon name="add-photo-alternate" size={32} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  titleInput: {
    height: 48,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    fontSize: 16,
  },
  contentInput: {
    height: 200,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    fontSize: 16,
  },
  addImage: {
    height: 200,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 200,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeImage: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
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