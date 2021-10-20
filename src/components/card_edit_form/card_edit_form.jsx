import React, {useRef} from 'react';
import Button from '../button/button';
import ImageFileInput from '../image_file_input/image_file_input';
import styles from './card_edit_form.module.css';

const CardEditForm = ({ card, updateCard, deleteCard }) => {
    const {name, company, title, email, message, theme, filename, fileURL} = card;
    
    const onChange = (event) => {
        if (event.currentTarget == null){
            return;
        }
        event.preventDefault();
        updateCard({
            ...card,
            [event.currentTarget.name]: event.currentTarget.value,
        }
        )
    }
    const onSubmit = () => {
        deleteCard(card);
    };

    const formRef = useRef();
    const nameRef = useRef();
    const companyRef = useRef();
    const themeRef = useRef();
    const titleRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    return (
        <form className={styles.form}>
            <input ref={nameRef} onChange={onChange} className={styles.input} type="text" name="name" value={name}></input>
            <input ref={companyRef} onChange={onChange} className={styles.input} type="text" name="company" value={company}></input>
            <select ref={themeRef} onChange={onChange} className={styles.select} name="theme" value={theme}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="colorful">Colorful</option>
            </select>
            <input ref={titleRef} onChange={onChange} className={styles.input} type="text" name="title" value={title}></input>
            <input ref={emailRef} onChange={onChange} className={styles.input} type="text" name="email" value={email}></input>
            <textarea ref={messageRef} onChange={onChange} className={styles.textarea} name="message" value={message}></textarea>
            <div className={styles.fileInput}><ImageFileInput /></div>
            <Button name="Delete" onClick={onSubmit} />
        </form>
    )
};

export default CardEditForm;