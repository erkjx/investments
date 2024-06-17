import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import styles from "./styles.module.css";
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const [investments, setInvestments] = useState([]);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState({});
    const [userEmail, setUserEmail] = useState("");
    const navigateTo = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userEmailFromLocalStorage = localStorage.getItem("email");
                if (userEmailFromLocalStorage) {
                    setUserEmail(userEmailFromLocalStorage);
                }
                const res = await axios.get('http://localhost:8080/investments');
                setInvestments(res.data);
                const initialCommentsState = {};
                res.data.forEach((investment) => {
                    initialCommentsState[investment._id] = "";
                });
                setNewComment(initialCommentsState);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const handleProfile = () => {
        navigateTo('/profile')
    };

    const handleShowComments = async (investmentId) => {
        try {
            const res = await axios.get(`http://localhost:8080/comments/${investmentId}`);
            setComments({ ...comments, [investmentId]: res.data });
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleComments = (investmentId) => {
        if (comments[investmentId]) {
            setComments({ ...comments, [investmentId]: null });
        } else {
            handleShowComments(investmentId);
        }
    };


    const handleAddComment = async (investmentId) => {
        try {
            const content = newComment[investmentId];
            if (!content) {
                console.error("Content is empty");
                return;
            }
            const userEmailFromLocalStorage = localStorage.getItem("email");
            if (!userEmailFromLocalStorage) {
                console.error("User email not found in localStorage");
                return;
            }
            const res = await axios.post(`http://localhost:8080/comments`, {
                investmentId,
                userEmail: userEmailFromLocalStorage,
                content: content,
            });
            setComments({ ...comments, [investmentId]: [...(comments[investmentId] || []), res.data] });
            setNewComment({ ...newComment, [investmentId]: "" });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.main_container}>
            <div>
                <nav className={styles.navbar}>
                    <h1>Eryk Kołodziejczyk</h1>
                    <button onClick={handleProfile}>
                        Profile
                    </button>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </nav>
            </div>
            <div className={styles.content}>
                <h2>Investments</h2>
                <ul className={styles.investment_list}>
                    {investments.map((investment) => (
                        <li key={investment._id} className={styles.investment_item}>
                            <h3>{investment.title}</h3>
                            <p>{investment.description}</p>
                            <img src={investment.image} alt={investment.title} className={styles.investment_image} />
                            <div className={styles.comment_input_container}>
                                <textarea
                                    rows="3"
                                    value={newComment[investment._id]}
                                    onChange={(e) => setNewComment({ ...newComment, [investment._id]: e.target.value })}
                                    placeholder="Add a comment"
                                    className={styles.comment_input}
                                />
                                <IoMdSend
                                    className={styles.comment_icon}
                                    onClick={() => handleAddComment(investment._id)}
                                />
                            </div>
                            <button onClick={() => handleToggleComments(investment._id)}>
                                {comments[investment._id] ? "Hide Comments" : "Show Comments"}
                            </button>
                            {comments[investment._id] && (
                                <div className={styles.comments_section}>
                                    {comments[investment._id].map((comment) => (
                                        <div key={comment._id} className={styles.comment}>
                                            <span>{comment.userEmail}: {comment.content}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Main;
