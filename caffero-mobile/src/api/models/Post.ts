export interface Post {
    id: string;
    imageUrl: string;
    likeCount: number;
    dislikeCount: number;
    userId: string;
    title: string;
} 

export interface PostDetail extends Post {
    description: string;
} 

export interface PostCreate {
    description: string;
    imageUrl: string;
    title: string;
} 

export interface PostUpdate {
    description?: string | null;
    imageUrl?: string | null;
    title?: string | null;
    userId?: string | null;
} 

// Added interfaces to match imports in postService.ts
export interface GetPost extends PostDetail {
    // Using PostDetail as base which already extends Post
    // Add any additional properties needed for retrieving a post
}

export interface GetPostList extends Post {
    // Using Post as base for list items
    // Add any additional properties needed for post list items
}

export interface CreatePost extends PostCreate {
    // Using PostCreate as base
    // Add any additional properties needed for creating a post
}

export interface UpdatePost extends PostUpdate {
    id: string; // Required for identifying which post to update
}

export interface DeletePost {
    id: string; // Only need the ID to delete a post
}

