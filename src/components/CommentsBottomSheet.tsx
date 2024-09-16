import React, { useContext, useState } from 'react';
import BottomSheet from './BottomSheet';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { FormatComment, FormatPost } from '../interfaces';
import { Avatar, TextInput, IconButton } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import { api } from '../config/Api';

export default function CommentsBottomSheet({ currentPost }: { currentPost: FormatPost | null }) {
    const { user } = useContext(AuthContext);
    const [commentPost, setCommentPost] = useState("")

    async function handleSubmit() {
        if (commentPost.length) {
            try {
                const response = await api.post("/comments", {
                    userId: user?.userId,
                    postId: currentPost?.postId,
                    message: commentPost
                }
                );



                setCommentPost("")
            } catch (error) {
                console.log(error);

                alert("Error ao commentar")
            }
        }
    }
    return (
        <View style={styles.container}>
            <BottomSheet id='CommentsBottomSheet' snapPoints={[90]}>
                <View style={styles.sheetContent}>
                    <View style={styles.commentsContainer}>
                        <ScrollView style={styles.scrollView}>
                            {currentPost?.comments && currentPost?.comments?.map((comments: FormatComment, index: number) => (
                                <View key={index} style={styles.comment}>
                                    <Avatar.Text size={40} label={comments?.user?.name} />
                                    <View style={styles.commentContent}>
                                        <Text style={styles.commentUser}>{comments?.user?.name}</Text>
                                        <Text style={styles?.commentText}>{comments?.message}</Text>
                                    </View>
                                    <IconButton icon="heart-outline" size={20} onPress={() => { }} />
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <TextInput
                    onChangeText={setCommentPost}
                    onSubmitEditing={handleSubmit}
                    value={commentPost}
                    mode='outlined'
                    label={`Comentar como ${user?.name}`}
                    style={styles.input}
                />

            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    sheetContent: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    commentsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    scrollView: {
        width: '100%',
    },
    comment: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 50,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#efefef"
    },
    commentContent: {
        flex: 1,
        marginLeft: 10,
    },
    commentUser: {
        fontWeight: 'bold',
    },
    commentText: {
        color: '#333',
    },
    input: {
        margin: 10,
        width: '95%',
    },
});
