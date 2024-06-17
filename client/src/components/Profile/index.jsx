import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userComments, setUserComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchUserComments = async () => {
            try {
                const userEmailFromLocalStorage = localStorage.getItem("email");
                if (userEmailFromLocalStorage) {
                    setUserEmail(userEmailFromLocalStorage);
                }
                const res = await axios.get(`http://localhost:8080/comments/user/${userEmailFromLocalStorage}`);
                setUserComments(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserComments();
    }, []);

    const handleMainPage = () => {
        navigateTo('/')
    };

    const handleUpdateComment = async (commentId) => {
        try {
            await axios.put(`http://localhost:8080/comments/${commentId}`, {
                content: editedContent,
            });
            const updatedComments = userComments.map(comment =>
                comment._id === commentId ? { ...comment, content: editedContent } : comment
            );
            setUserComments(updatedComments);
            setEditingComment(null);
            setEditedContent("");
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:8080/comments/${commentId}`);
            const updatedComments = userComments.filter(comment => comment._id !== commentId);
            setUserComments(updatedComments);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditComment = (commentId, content) => {
        setEditingComment(commentId);
        setEditedContent(content);
    };

    return (
        <div className={styles.main_container}>
            <div>
                <nav className={styles.navbar}>
                    <h1>Eryk Kołodziejczyk</h1>
                    <button onClick={handleMainPage}>
                        Main
                    </button>
                </nav>
            </div>
            <div className={styles.content}>
                <h2>Your Comments</h2>
                <ul className={styles.comments_list}>
                    {userComments.map((comment) => (
                        <li key={comment._id} className={styles.comment_item}>
                            {editingComment === comment._id ? (
                                <div>
                                    <textarea
                                        rows="3"
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                        className={styles.comment_input}
                                    />
                                    <button onClick={() => handleUpdateComment(comment._id)}>
                                        Update
                                    </button>
                                </div>
                            ) : (
                                <span>{comment.content}</span>
                            )}
                            <div>
                                <button onClick={() => handleEditComment(comment._id, comment.content)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteComment(comment._id)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
