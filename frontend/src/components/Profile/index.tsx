import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { fetchProfile, setProfile, selectProfile } from "store/profileSlice";

const Profile = () => {

    const dispatch = useDispatch();
    const { loading, profile } = useSelector(selectProfile);

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [editing, setEditing] = useState(false);

    const handleButtonPressed = () => {

        if (editing) {
            // save state
            setNameErr('');
            if (name.length === 0) {
                setNameErr('グループ名を入力してください');
                return;
            }
            dispatch(setProfile({ name: name }));
        } else {
            // set state
            setName(profile!.name);
        }

        setEditing(!editing);
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    useEffect(() => {
        (async () => {
            if (profile === null || profile === undefined) {
                dispatch(fetchProfile());
            }
        })();
    }, [dispatch, profile]);

    if (loading) {
        return (<div>loading...</div>);
    }

    if (profile === null || profile === undefined) {
        return (<div>loading...</div>)
    }

    return (
        <>
        <Container>
            <h2>プロフィール</h2>
            <h3>ユーザー名</h3>
            <Row className="align-items-center">
                <Col md={3}>{(editing) ? (
                    <Form.Control
                      type="text"
                      placeholder="名前を入力してください"
                      value={name}
                      onChange={handleNameChange}
                    />
                ) : (
                    <div>{profile!.name}</div>
                )}</Col>
                <Col xs={3}><Button onClick={handleButtonPressed}>{(editing) ? '編集' : '保存'}</Button></Col>
            </Row>
            {nameErr && <span className="text-danger small">{nameErr}</span>}
        </Container>
        </>
    );
};

export default Profile;